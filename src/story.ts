import Passage from "./passage.ts"
import { getAttribute } from "./utils.ts"

let _storyData: HTMLElement | null = null
export let ifID = "00000000-0000-4000-A000-000000000000"
export let storyTitle = "A Malachite Story"

export let start: Passage | undefined = undefined

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

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

	if (!_storyData) throw new Error("Missing tw-storydata element")

	storyTitle = getAttribute(_storyData, "name") || ""
	if (!storyTitle) throw new Error("Missing story name")

	ifID = getAttribute(_storyData, "ifid") || "nope"
	if (!uuidRegex.test(ifID)) throw new Error("Invalid or missing IFID")

	initPassages()

	// get the user scripts
	const scripts =
		(_storyData?.querySelectorAll(
			`script[type="text/twine-javascript"]`,
		) as unknown as HTMLScriptElement[]) || []
	scripts.forEach((s, i) => {
		_scripts.push(new Passage(`tw-user-script-${i}`, [], s.innerText))
	})

	// same for the user styles
	const styles =
		(_storyData?.querySelectorAll(
			`style[type="text/twine-css"]`,
		) as unknown as HTMLStyleElement[]) || []
	styles.forEach((s, i) => {
		_styles.push(new Passage(`tw-user-style-${i}`, [], s.innerText))
	})
}

function initPassages() {
	for (const p of Array.from(_storyData?.querySelectorAll("tw-passagedata") || [])) {
		const name = getAttribute(p, "name") || "Passage"
		const tags = getAttribute(p, "tags")?.split(" ") || []
		const content = p.innerHTML

		// we don't want duplicate passage names
		if (_passages.find((p) => p.name === name))
			throw new Error(`Duplicate passage name found: ${name}`)

		const passage = new Passage(name, tags, content)
		if (
			passage.name.toLowerCase() === (getAttribute(_storyData, "start")?.toLowerCase() ?? "start")
		) {
			start = passage
		}
		_passages.push(passage)
	}
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
	init,
}
