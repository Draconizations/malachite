import Alpine from "alpinejs"

// directly renders a passage inside another
Alpine.directive("passage", (el, { expression }, { evaluate }) => {
	const passage = evaluate(expression)

	if (typeof passage !== "string") {
		throw new TypeError("Passage directive did not evaluate to a string.")
	}

	window.Engine.show(el, passage)
})

/* 
	turns the element into a frame.
	optionally allows specifying a name, defaults to the unnamed frame.
*/
Alpine.directive("frame", (el, { expression, value, modifiers }, { evaluate, effect }) => {
	const name = value ?? "_"

	if (!(Alpine.store("story") as any)._frames[name] || modifiers.includes("overwrite"))
		(Alpine.store("story") as any)._frames[name] = evaluate(expression)

	effect(() => {
			window.Engine.show(el, (Alpine.store("story") as any)._frames[name])
	})
})

/*
	swaps a given frame to the specified passage.
	defaults to to the unnamed frame.
	optionally allows "skipping" updating the history.
*/
Alpine.directive("link", (el, { expression, value, modifiers }, { evaluate, cleanup }) => {
	const name = value ?? "_"
	const passage = evaluate(expression)

	if (typeof passage !== "string") {
		throw new TypeError("Passage link did not evaluate to a string.")
	}

	const callback = () => {
		window.Engine.frameQueue.set(name, passage)

		Alpine.nextTick(() => {
			if (window.Engine.frameQueue.size > 0) {
				window.Engine.frameQueue.forEach((v, k) => {
					console.log(k, v)
					;(Alpine.store("story") as any)._frames[k] = v
				})
				window.Engine.frameQueue.clear()

				if (!modifiers.includes("skip")) {
					window.Engine.play()
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
