import Config from "./config.ts"
import { defaultLayout } from "./html.ts"
import { render } from "./markup/index.ts"
import { push } from "./state.ts"
import { getScripts, getStyles, start as storyStart } from "./story.ts"
import type { FrameQueueEntry } from "./utils.ts"

// @ts-ignore
export const version: string = __VERSION__
const _viewport = document.querySelector("#mala-viewport") || document.createElement("div")

export const frameQueue = new Map<string, FrameQueueEntry>()
/**
 * Initializes the Engine
 *
 * This is the very first thing that runs once the page is opened.
 */
export function init() {
	// initialize stuff here.
}

export function runUserScripts() {
	// load the user styles
	const storyStyle = document.createElement("style")
	storyStyle.innerText = getStyles()
		.map((p) => p.source)
		.join("\n")

	storyStyle.id = "story-style"
	storyStyle.setAttribute("type", "text/css")

	document.head.appendChild(storyStyle)

	// run the user scripts
	getScripts().forEach((p) => {
		try {
			new Function(p.source)()
		} catch (e) {
			console.error(e)
			// TODO: integrate this with the future error handling system
		}
	})
}

/**
 * Starts the game.
 *
 * This function is called after user scripts are ran and will respect the relevant config settings
 */
export async function start() {
	// TODO: config setting to overwrite the default layout.
	const startPassage = storyStart?.name.toLowerCase() || "start"

	if (typeof Config.storyInterface === "function") {
		render(_viewport, Config.storyInterface(startPassage), true)
	} else {
		render(_viewport, defaultLayout(startPassage), true)
	}
}

/**
 * Updates the State and History, and updates Alpine.store("story") accordingly.
 *
 * **Note:** this function is (by default) automatically triggered on passage navigation, i.e. by `x-link` or
 * `Frame.goto()`. It can be called manually as well.
 */
export function play(frames: Map<string, FrameQueueEntry> = new Map<string, FrameQueueEntry>()) {
	// check if autosaving is allowed
	push($s, frames)
}

export default {
	init,
	start,
	runUserScripts,
}
