import Alpine from "alpinejs"
import { frameQueue, play } from "./engine.ts"
import markup from "./markup/index.ts"
import { get } from "./story.ts"

let recursionCount = 0
let recursionMax = 1000

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
	} else {
		recursionCount ++
	}
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

	const frame = data.value ?? "_"
	const name = evaluate(data.expression)

	if (typeof name !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}
	const passage = get(name)
	if (!passage) throw Error(`${dPrint(data)}: passage with name "${name}" not found.`)

	if (!(Alpine.store("story") as any)._frames[frame] || data.modifiers.includes("overwrite"))
		(Alpine.store("story") as any)._frames[frame] = passage.name

	effect(() => {
		const goto = get((Alpine.store("story") as any)._frames[frame])
		if (!goto) throw Error(`${dPrint(data)}: passage with name "${name}" not found.`)

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

	const frame = data.value ?? "_"
	const name = evaluate(data.expression)

	if (typeof name !== "string") {
		throw new TypeError(`${dPrint(data)}: expression did not evaluate to a string.`)
	}

	const callback = () => {
		const passage = get(name)
		if (!passage) throw Error(`${dPrint(data)}: passage with name "${name}" not found.`)

		frameQueue.set(frame, passage.name)

		Alpine.nextTick(() => {
			if (frameQueue.size > 0) {
				frameQueue.forEach((v, k) => {
					;(Alpine.store("story") as any)._frames[k] = v
				})
				frameQueue.clear()

				if (!data.modifiers.includes("skip")) {
					play()
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

export default Alpine
