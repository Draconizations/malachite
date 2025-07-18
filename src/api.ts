/* This is the part of Malachite that is exposed to the end user
  All public APIs are declared here.

  Since this will interface with plain javascript, we should thoroughly check types!
*/

import _Alpine, { _allowNavigation, type MAlpine } from "./alpine.ts"
import _Config from "./config.ts"
import { play, version } from "./engine.ts"
import type Frame from "./frame.ts"
import { active, allFrames, current, type FrameConfig, getFrame, goto, newFrame } from "./frame.ts"
import { markup, render } from "./markup/index.ts"
import Passage from "./passage.ts"
import {
	_history,
	_index,
	type emptyData,
	getLocalSave,
	jump,
	load,
	localSaveLocation,
	SaveType,
	setLocalSave,
} from "./state.ts"
import { filter, find, get, has, ifID, start, storyTitle } from "./story.ts"
import { doTransition } from "./transition.ts"

export default function () {
	window.Engine = engineAPI
	window.Story = storyAPI
	window.State = stateAPI
	window.Frames = frameAPI
	window.Utils = utilAPI
	window.Config = configAPI

	window.Alpine = alpineAPI
}

declare global {
	// @ts-ignore
	const Engine: typeof engineAPI
	// @ts-ignore
	const Story: typeof storyAPI
	// @ts-ignore
	const Alpine: typeof alpineAPI
	// @ts-ignore
	const State: typeof stateAPI
	// @ts-ignore
	const Frames: typeof frameAPI
	// @ts-ignore
	const Utils: typeof utilAPI
	// @ts-ignore
	const Config: typeof configAPI
	// @ts-ignore
	const $s: typeof emptyData & Record<string, any>
	interface Window {
		Engine: typeof engineAPI
		Story: typeof storyAPI
		Alpine: typeof alpineAPI
		State: typeof stateAPI
		Frames: typeof frameAPI
		Utils: typeof utilAPI
		Config: typeof configAPI
		$s: typeof emptyData & Record<string, any>
	}
}

const alpineAPI: MAlpine = _Alpine

const engineAPI = {
	version,
	play,
	markup: (source: string | Passage) => {
		if (source instanceof Passage) {
			return markup(source.source)
		}
		if (typeof source !== "string")
			throw new TypeError(
				"Engine.render: parameter 'source' must be a string or an instance of Passage.",
			)
		return markup(source)
	},
	render: (el: Element, source: string | Passage, skip = false) => {
		if (source instanceof Passage) {
			render(el, source.source)
		}
		if (typeof source !== "string")
			throw new TypeError(
				"Engine.render: parameter 'source' must be a string or an instance of Passage.",
			)
		render(el, source, skip)
	},
}

const storyAPI = {
	get id() {
		return ifID
	},
	title: storyTitle,

	get start() {
		return Object.freeze(start) as Passage | undefined
	},

	// gets a single passage by name
	get: (name: string): Passage | undefined => {
		if (typeof name !== "string")
			throw new TypeError("Story.getz: parameter 'name' must be a string")
		return get(name)
	},
	// checks if the story has a passage with this name
	has: (name: string): boolean => {
		if (typeof name !== "string")
			throw new TypeError("Story.has: parameter 'name' must be a string")
		return has(name)
	},
	// finds all passages that match a predicate
	filter: (predicate: (passage: Passage) => boolean): Passage[] => {
		if (typeof predicate !== "function")
			throw new TypeError("Story.filter: parameter 'predicate' must be a function")
		return filter(predicate)
	},
	// gets the first passage that matches a predicate
	find: (predicate: (passage: Passage) => boolean): Passage | undefined => {
		if (typeof predicate !== "function")
			throw new TypeError("Story.find: parameter 'predicate' must be a function")
		return find(predicate)
	},
}

const stateAPI = {
	SaveType: Object.freeze(SaveType),
	back: () => {
		jump(-1)
	},
	forward: () => {
		jump(1)
	},
	jump: (target: number) => {
		jump(target)
	},
	restart: () => {
		load()
	},
	allow: _allowNavigation,
	load: {
		fromLocal: (slot: number) => {
			const save = getLocalSave(slot)
			if (!save) throw new Error(`No save data found at ${localSaveLocation(slot)}.`)
			load(save)
		},
	},
	save: {
		toLocal: (slot: number, title: string) => {
			return setLocalSave(_history, _index, slot, title)
		},
		getLocal: (slot: number): any => {
			const data = localStorage.getItem(localSaveLocation(slot))
			if (data) return JSON.parse(data)
			return undefined
		},
	},
}

const frameAPI = {
	/**
	 * Creates a new Frame object and initializes it with the given configuration
	 *
	 * Useful for changing Frame behavior
	 * @param name
	 * @param config
	 * @returns
	 */
	new: (name?: string, config?: FrameConfig): Readonly<Frame> => {
		if (typeof name !== "string") throw TypeError("Frame.new: parameter 'name' must be a string.")
		return newFrame(name, config)
	},

	/**
	 * Gets the instance of a Frame with the given name
	 * @param name
	 * @returns
	 */
	get: (name?: string): Readonly<Frame> => {
		if (name && typeof name !== "string")
			throw TypeError("Frame.get: parameter 'name' must be a string.")
		return getFrame(name)
	},

	all: () => {
		return allFrames()
	},

	/**
	 * Jumps to the specified passage. Uses the unnamed frame by default.
	 * @param passage  The passage to jump to
	 * @param frame (optional) the frame to use
	 * @param fade (optional) whether to skip passage transition or not
	 * @param skip (optional) whether to skip saving state to history or not
	 */
	goto: (passage: string | Passage, frame = "_", fade = true, skip = false) => {
		let name: string
		if (passage instanceof Passage) name = passage.name
		else name = passage

		if (typeof name !== "string")
			throw TypeError("Frame.goto: parameter 'passage' must be a string or an instance of Passage.")

		goto(name, frame, fade, skip)
	},
	/**
	 * Gets the currently active Passage in the specified frame
	 * @param frame
	 * @returns
	 */
	current: (frame: string | undefined = "_"): Passage | undefined => {
		return current(frame)
	},
	/**
	 * Gets an array of all currently active passages (regardless of whether they're visible or not)
	 * @returns
	 */
	active: (): (Passage | undefined)[] => {
		return active()
	},
}

const utilAPI = {
	/**
	 * Makes the target element perform a transition. The visual aspect of the transtiion is
	 * determined by the element's CSS. Read [the documentation](https://draconizations.github.io/malachite/prerelease/general/directives/) for more information.
	 * @param el
	 * @param detail
	 * @param bubble
	 */
	transition: (el: Element, detail: any, bubble?: boolean) => {
		doTransition(el, detail, {
			applyClass: true,
			emitEvent: true,
			delay: true,
			bubble: bubble ?? false,
		})
	},
}

const configAPI = {
	State: {
		get allowSave(): (type: number, frames?: Map<string, string>) => boolean {
			return _Config.allowSave
		},
		set allowSave(value) {
			_Config.allowSave = value
		},
		get localSaveName() {
			return _Config.localSaveName
		},
		set localSaveName(value: string) {
			_Config.localSaveName = value
		},
		get maxHistory() {
			return _Config.maxHistory
		},
		set maxHistory(value: number) {
			_Config.maxHistory = value
		},
	},
	Story: {
		get interface(): ((start: string) => string) | undefined {
			return _Config.storyInterface
		},
		set interface(value) {
			_Config.storyInterface = value
		},
	},
	Frame: {
		get class() {
			return _Config.frameClass
		},
		set class(value: string) {
			_Config.frameClass = value
		},
	},
}
