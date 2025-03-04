import { defaultLayout } from "./html.ts"

export default class Engine {
	#viewport = document.querySelector("#mala-viewport") || document.createElement("div")
	#container: Element

	constructor() {
		const layout = window.Story.layout ?? defaultLayout

		window.Story.render(this.#viewport, layout)

		const container = document.querySelector("#mala-main")
		if (!container) {
			throw new Error("Layout is missing an element with the id `mala-main`.")
		}
		this.#container = container

		window.Story.show(this.#container, window.Story.start?.name || "Start")
	}
}
