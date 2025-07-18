import Alpine from "alpinejs"
import Config from "./config.ts"
import { frameQueue } from "./engine.ts"
import { getFrame } from "./frame.ts"
import { render } from "./markup/index.ts"
import { get } from "./story.ts"
import { doTransition } from "./transition.ts"
import { runFrameQueue } from "./utils.ts"

let recursionCount = 0
const recursionMax = 1000

export const _frames: Record<string, { passage: string; transition: boolean }> = Alpine.reactive({})

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
	const contents = el.innerHTML

	if (typeof name !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}
	const passage = get(name)
	if (!passage) throw Error(`${dPrint(data)}: passage with name "${name}" not found.`)

	render(el, passage.source, true)

	// if there's an element with x-contents inside the embedded passage, replace it with
	// the contents of the x-passage element
	const replace = el.querySelector("[x-contents]")
	if (replace) {
		replace.innerHTML = contents
	}

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
		// don't overwrite the frame contents on intialization unless we told it to
		data.modifiers.includes("overwrite")
			? passage.name
			: (Alpine.store("story") as any)._frames[frameName]

	frameQueue.set(frame.name, {
		passage: p,
		doTransition: false, // don't transition on frame initialization
		pushToState: true, // definitely do push to $s._frames tho
	})

	// Run the queue, we don't want to create a new history object (1st false)
	// TODO: check if we really do need to keep the queue after (2nd false)
	runFrameQueue(false, false, frameQueue)

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
			pushToState: true, // do put these in $s._frames
			doTransition: !data.modifiers.includes("!fade"), // transition unless told otherwise
		})

		Alpine.nextTick(() => {
			// push to history unless .!play is present
			runFrameQueue(!data.modifiers.includes("!play"), true, frameQueue)
		})
	}

	el.addEventListener("click", callback)

	cleanup(() => {
		el.removeEventListener("click", callback)
	})
})

// Play a fade animation whenever the expression changes
Alpine.directive("fade", (el, { expression, modifiers }, { evaluateLater, effect }) => {
	const useClass = !modifiers.includes("!class")
	// TODO: make this configurable
	if (useClass) el.classList.add("mala-fade")

	const crossfade = evaluateLater(expression)

	let prev: any

	effect(() => {
		crossfade(async (value) => {
			if (prev === value) return

			doTransition(el, value, {
				applyClass: useClass && prev !== undefined,
				emitEvent: true,
				delay: prev !== undefined,
				bubble: false,
			})

			prev = value
		})
	})
})

// x-reveal! My favorite <3
// display a link that disappears on click and reveals hidden text underneath
// we can optionally keep the link as well
Alpine.directive("reveal", (el, data, { evaluate }) => {
	el.classList.add("mala-reveal", "hide")

	const text = evaluate(data.expression)
	if (typeof text !== "string")
		throw Error(`${dPrint(data)}: expression did not evaluate to a string`)

	const contents = el.innerHTML

	const btn = document.createElement("button")
	btn.classList.add("tw-link", "mala-reveal-btn")
	btn.innerHTML = text

	el.innerHTML = ""
	el.appendChild(btn)

	btn.addEventListener(
		"click",
		async () => {
			doTransition(el, null, {
				applyClass: true,
				emitEvent: true,
				delay: true,
				bubble: false,
				action: () => {
					const div = document.createElement("div")
					div.classList.add("mala-reveal-content")
					div.innerHTML = contents

					if (data.modifiers.includes("keep")) {
						btn.disabled = true
					} else {
						el.innerHTML = ""
					}

					el.appendChild(div)
				},
			})
		},
		{
			once: true,
		},
	)
})

/*
	Allows easily accessing the story store with $s
*/
Alpine.magic("s", () => {
	return Alpine.store("story")
})

export type MAlpine = typeof Alpine

export default Alpine
