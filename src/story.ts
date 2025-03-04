import Passage from "./passage.ts"
import { getAttribute } from "./utils.ts"

const SPECIAL_PASSAGES = {
	layout: "StoryLayout",
}

export default class Story {
	#storyData: HTMLElement | null
	ifID: string
	storyTitle: string

	#start: Passage | null = null
	get start() {
		return this.#start
	}

	#passages: Passage[] = []
	#layout: Passage | undefined
	get layout() {
		return this.#layout?.source
	}

	constructor() {
		this.#storyData = document.querySelector("tw-storydata")

		this.ifID = getAttribute(this.#storyData, "ifid") || "00000000-0000-4000-A000-000000000000"
		this.storyTitle = getAttribute(this.#storyData, "name") || "A Malachite Story"

		for (const p of Array.from(this.#storyData?.querySelectorAll("tw-passagedata") || [])) {
			const name = getAttribute(p, "name") || "Passage"
			const tags = getAttribute(p, "tags")?.split(" ")
			const content = p.innerHTML

			// handle special cases
			if (
				Object.values(SPECIAL_PASSAGES).find(
					(special) => special.toLowerCase() === name.toLowerCase(),
				)
			) {
				if (SPECIAL_PASSAGES.layout.toLowerCase() === name.toLowerCase()) {
					this.#layout = new Passage(name, [], content)
				} else {
					throw new Error(`Passage name "${name}" is reserved.`)
				}
			}
			// everything else is a regular passage
			else {
				const passage = new Passage(name, tags || [], content)
				if (passage.name.toLowerCase() === "start") this.#start = passage
				this.#passages.push(passage)
			}
		}
	}

	findPassage(name: string) {
		const passage = this.#passages.find((p) => p.name.toLowerCase() === name.toLowerCase())
		if (!passage) {
			throw new Error(`No passage with name "${name}" found.`)
		}
		return passage
	}

	show(el: Element, name: string) {
		const passage = window.Story.findPassage(name)
		this.render(el, passage.source)
	}

	render(el: Element, source: string) {
		const txt = document.createElement("textarea")
		txt.innerHTML = source
		el.innerHTML = txt.value
		txt.remove()
	}
}
