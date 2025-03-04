import Alpine from "alpinejs"

Alpine.directive("passage", (el, { expression }, { evaluate }) => {
	window.Story.show(el, evaluate(expression))
})

Alpine.directive("frame", (el, { expression, value }, { evaluate, effect }) => {
	const name = value ?? "_default"

	if (!(Alpine.store("story") as any).frames[name])
		(Alpine.store("story") as any).frames[name] = evaluate(expression)

	effect(() => {
		window.Story.show(el, (Alpine.store("story") as any).frames[name])
	})
})

Alpine.directive("link", (el, { expression, value }, { evaluate, cleanup }) => {
	const name = value ?? "_default"
	const passage = evaluate(expression)

	const callback = () => {
		Alpine.nextTick(() => {
			;(Alpine.store("story") as any).frames[name] = passage
		})
	}

	el.addEventListener("click", callback)

	cleanup(() => {
		el.removeEventListener("click", callback)
	})
})

Alpine.magic("s", () => {
	return Alpine.store("story")
})

export default Alpine
