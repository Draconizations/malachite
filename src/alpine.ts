import Alpine from "alpinejs"
import { frameQueue, play } from "./engine.ts"
import markup from "./markup/index.ts"
import { get } from "./story.ts"
import { getFrame } from "./frame.ts"

let recursionCount = 0
const recursionMax = 1000

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
		throw Error(
			`${location}: Infinite recursion detected while trying to render passage.`,
		)
	}
	recursionCount ++
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

	el.innerHTML = markup(passage.source)
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

	const frameName = data.value ?? "_"
	const passageName = evaluate(data.expression)

	if (typeof passageName !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}

	const frame = getFrame(frameName)

	const passage = get(passageName)
	if (!passage) throw Error(`${dPrint(data)}: passage with name "${passageName}" not found.`)

	frame.passage = passage.name

	if (frame.history && (!(Alpine.store("story") as any)._frames[frameName] || data.modifiers.includes("overwrite")))
		(Alpine.store("story") as any)._frames[frameName] = passage.name

	effect(() => {
		const goto = frame.passage ? get(frame.passage) : undefined
		if (!goto) throw Error(`${dPrint(data)}: passage with name "${frame.passage}" not found.`)

		el.innerHTML = markup(goto.source)

		Alpine.nextTick(() => {
			recursionCount = 0
		})
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

		frameQueue.set(frameName, passage.name)

		Alpine.nextTick(() => {
			if (frameQueue.size > 0) {
				frameQueue.forEach((v, k) => {
					frame.passage = v
					if (frame.history) (Alpine.store("story") as any)._frames[k] = frame.passage
				})
				frameQueue.clear()

				if (!data.modifiers.includes("skip")) {
					play(frameName, passage)
				}
			}
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
