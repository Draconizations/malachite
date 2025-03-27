import Alpine from "alpinejs"
import Config from "./config.ts"
import { frameQueue } from "./engine.ts"
import { getFrame } from "./frame.ts"
import { render } from "./markup/index.ts"
import { get } from "./story.ts"
import { runFrameQueue } from "./utils.ts"

let recursionCount = 0
const recursionMax = 1000

export const _frames: Record<string, { passage: string; transition: boolean; play: boolean }> =
	Alpine.reactive({})

export const _allowNavigation: {
	back: boolean
	forward: boolean
} = Alpine.reactive({
	back: false,
	forward: false,
})

function dPrint(data: Alpine.DirectiveData) {
	const { value, modifiers, expression, type } = data
	let str = `x-${type}`
	if (value) str += `:${value}`
	if (modifiers.length > 0) str += `.${modifiers.join()}`
	if (expression) str += `="${expression}"`
	return str
}

function checkRecursion(location: string) {
	if (recursionCount >= recursionMax) {
		throw Error(`${location}: Infinite recursion detected while trying to render passage.`)
	}
	recursionCount++
}

// directly renders a passage inside another
Alpine.directive("passage", (el, data, { evaluate }) => {
	checkRecursion(dPrint(data))

	const name = evaluate(data.expression)

	if (typeof name !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}
	const passage = get(name)
	if (!passage) throw Error(`${dPrint(data)}: passage with name "${name}" not found.`)

	render(el, passage.source, true)
	Alpine.nextTick(() => {
		recursionCount = 0
	})
})

/* 
	turns the element into a frame.
	optionally allows specifying a name, defaults to the unnamed frame.
*/
Alpine.directive("frame", (el, data, { evaluate, effect }) => {
	checkRecursion(dPrint(data))
	el.classList.add(Config.frameClass)

	const frameName = data.value ?? "_"
	const passageName = evaluate(data.expression)

	if (typeof passageName !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}

	const frame = getFrame(frameName)

	const passage = get(passageName)
	if (!passage) throw Error(`${dPrint(data)}: passage with name "${passageName}" not found.`)

	const p =
		(Alpine.store("story") as any)._frames[frameName] === undefined ||
		data.modifiers.includes("overwrite")
			? passage.name
			: (Alpine.store("story") as any)._frames[frameName]

	frameQueue.set(frame.name, {
		passage: p,
		play: false,
		transition: false,
	})

	runFrameQueue(false, frameQueue)

	effect(() => {
		if (_frames[frame.name]) {
			const goto = get(_frames[frame.name].passage)
			if (!goto)
				throw Error(
					`${dPrint(data)}: passage with name "${_frames[frame.name].passage}" not found.`,
				)

			render(el, goto.source, !_frames[frame.name].transition)

			Alpine.nextTick(() => {
				recursionCount = 0
			})
		}
	})
})

/*
	swaps a given frame to the specified passage.
	defaults to to the unnamed frame.
	optionally allows "skipping" updating the history.
*/
Alpine.directive("link", (el, data, { evaluate, cleanup }) => {
	el.classList.add("tw-link")

	const frameName = data.value ?? "_"
	const passageName = evaluate(data.expression)

	if (typeof passageName !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}

	const frame = getFrame(frameName)

	const callback = () => {
		const passage = get(passageName)
		if (!passage) throw Error(`${dPrint(data)}: passage with name "${passageName}" not found.`)

		frameQueue.set(frame.name, {
			passage: passage.name,
			play: !data.modifiers.includes("!play"),
			transition: !data.modifiers.includes("!change"),
		})

		Alpine.nextTick(() => {
			runFrameQueue(true, frameQueue)
		})
	}

	el.addEventListener("click", callback)

	cleanup(() => {
		el.removeEventListener("click", callback)
	})
})

/*
	Allows easily accessing the story store with $s
*/
Alpine.magic("s", () => {
	return Alpine.store("story")
})

export type MAlpine = typeof Alpine

export default Alpine
