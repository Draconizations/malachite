import { defaultLayout } from "./html.ts"
import type { Story } from "./story.ts"

export default function Engine(version?: number) {
	const _version = version ?? 0
	const _viewport = document.body

	const frameQueue = new Map<string, string>()

	return {
		frameQueue,
		/** 
		 * Initializes the Engine
		 * 
		 * This is the very first thing that runs once the page is opened.
		*/
		init() {
			// initialize stuff here.
		},
		
		/**
		 * Starts the game.
		 * 
		 * This function is called after user scripts are ran and will respect the relevant config settings
		 */
		start() {
			// TODO: config setting to overwrite the default layout.
			this.render(_viewport, defaultLayout(window.Story.start?.name || "start"))
		},

		/**
		 * Updates the State and History, and updates Alpine.store("story") accordingly.
		 * 
		 * **Note:** this function is automatically triggered on passage navigation, i.e. by `x-link` or
		 * `Frame.goto()`. It can be called manually as well.
		 */
		play() {
			window.State.new(JSON.parse(JSON.stringify(window.Alpine.store("story"))))
		},

		show(el: Element, name: string) {
			const passage = window.Story.get(name)
			if (!passage) throw new Error(`Passage with name "${name}" not found.`)
			this.render(el, passage.source)
		},
	
		render(el: Element, source: string) {
			const txt = document.createElement("textarea")
			txt.innerHTML = source
			el.innerHTML = txt.value
			txt.remove()
		}
	}
}