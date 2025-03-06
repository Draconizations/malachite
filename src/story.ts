import Passage from "./passage.ts"
import { getAttribute } from "./utils.ts"

let _storyData: HTMLElement | null = null
export let ifID = "00000000-0000-4000-A000-000000000000"
export let storyTitle = "A Malachite Story"

export let start: Passage | null = null

const _passages: Passage[] = []
const _styles: Passage[] = []
const _scripts: Passage[] = []

/**
 * Initializes the Story.
 *
 * Called after the Engine is initialized, but before user scripts.
 */
export function init() {
	_storyData = document.querySelector("tw-storydata")

	ifID = getAttribute(_storyData, "ifid") || "00000000-0000-4000-A000-000000000000"
	storyTitle = getAttribute(_storyData, "name") || "A Malachite Story"

	for (const p of Array.from(_storyData?.querySelectorAll("tw-passagedata") || [])) {
		const name = getAttribute(p, "name") || "Passage"
		const tags = getAttribute(p, "tags")?.split(" ") || []
		const content = p.innerHTML

		// everything else is a regular passage
		const passage = new Passage(name, tags, content)
		if (
			passage.name.toLowerCase() === (getAttribute(_storyData, "start")?.toLowerCase() ?? "start")
		) {
			start = passage
		}
		_passages.push(passage)
	}

	// get the user styles
	const scripts = _storyData?.querySelectorAll(`script[type="text/twine-javascript"]`) as unknown as HTMLScriptElement[] || []
	scripts.forEach((s, i) => {
		_scripts.push(new Passage(`tw-user-script-${i}`, [], s.innerText))
	})

	// same for the user styles
	const styles = _storyData?.querySelectorAll(`style[type="text/twine-css"]`) as unknown as HTMLStyleElement[] || []
	styles.forEach((s, i) => {
		_styles.push(new Passage(`tw-user-style-${i}`, [], s.innerText))
	})
}

/*
	Story->Passage API
	(mostly) the same as SugarCube's API here.
*/
export function get(name: string) {
	return _passages.find((p) => p.name.toLowerCase() === name.toLowerCase())
}

export function has(name: string) {
	return _passages.some((p) => p.name.toLowerCase() === name.toLowerCase())
}

export function filter(predicate: (passage: Passage) => boolean) {
	return _passages.filter(predicate)
}

export function find(predicate: (passage: Passage) => boolean) {
	return _passages.find(predicate)
}

/* 
	Return mutable internal objects as immutable copies 
*/
export function getStyles() {
	return Object.freeze(_styles)
}

export function getScripts() {
	return Object.freeze(_scripts)
}

export default {
	init
}