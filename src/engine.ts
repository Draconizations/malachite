import { defaultLayout } from "./html.ts"
import pkg from "../package.json" with { type: "json" }
import { push } from "./state.ts"
import { start as storyStart } from "./story.ts"

export const version = pkg.version
const _viewport = document.body

export const frameQueue = new Map<string, string>()
/**
 * Initializes the Engine
 *
 * This is the very first thing that runs once the page is opened.
 */
export function init() {
	// initialize stuff here.
}

/**
 * Starts the game.
 *
 * This function is called after user scripts are ran and will respect the relevant config settings
 */
export function start() {
	// TODO: config setting to overwrite the default layout.
	_viewport.innerHTML = defaultLayout(storyStart?.name || "start")
}

/**
 * Updates the State and History, and updates Alpine.store("story") accordingly.
 *
 * **Note:** this function is automatically triggered on passage navigation, i.e. by `x-link` or
 * `Frame.goto()`. It can be called manually as well.
 */
export function play() {
	push(JSON.parse(JSON.stringify(window.Alpine.store("story"))))
}

export default {
	init,
	start
}