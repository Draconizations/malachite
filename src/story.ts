import Passage from "./passage.ts"
import { getAttribute } from "./utils.ts"

const SPECIAL_PASSAGES = {
	layout: "StoryLayout",
}

export type Story = ReturnType<typeof Story>

export default function Story() {
	let _storyData: HTMLElement | null = null
	let ifID = "00000000-0000-4000-A000-000000000000"
	let storyTitle = "A Malachite Story"

	let _start: Passage | null = null

	const _passages: Passage[] = []
	let layout: Passage | undefined

	return {
		/* 
			Property accessors
		*/
		get start() {
			return _start
		},
		layout,

		/**
		 * Initializes the Story.
		 *
		 * Called after the Engine is initialized, but before user scripts.
		 */
		init() {
			_storyData = document.querySelector("tw-storydata")

			ifID = getAttribute(_storyData, "ifid") || "00000000-0000-4000-A000-000000000000"
			storyTitle = getAttribute(_storyData, "name") || "A Malachite Story"

			for (const p of Array.from(_storyData?.querySelectorAll("tw-passagedata") || [])) {
				const name = getAttribute(p, "name") || "Passage"
				const tags = getAttribute(p, "tags")?.split(" ")
				const content = p.innerHTML

				// handle special cases
				if (
					Object.values(SPECIAL_PASSAGES).find(
						(special) => special.toLowerCase() === name.toLowerCase(),
					)
				) {
					console.warn(`Passage name "${name}" is reserved.`)
				}
				// everything else is a regular passage
				else {
					const passage = new Passage(name, tags || [], content)
					if (
						passage.name.toLowerCase() ===
						(getAttribute(_storyData, "start")?.toLowerCase() ?? "start")
					) {
						_start = passage
					}
					_passages.push(passage)
				}
			}
		},

		/*
			Story->Passage API
			(mostly) the same as SugarCube's API here.
		*/

		get(name: string) {
			if (typeof name !== "string")
				throw new TypeError("Story.get() name parameter must be a string.")
			return _passages.find((p) => p.name.toLowerCase() === name.toLowerCase())
		},
		has(name: string) {
			if (typeof name !== "string")
				throw new TypeError("Story.get() name parameter must be a string.")
			return _passages.some((p) => p.name.toLowerCase() === name.toLowerCase())
		},
		filter(predicate: (passage: Passage) => boolean) {
			return _passages.filter(predicate)
		},
		find(predicate: (passage: Passage) => boolean) {
			return _passages.find(predicate)
		},
	}
}
