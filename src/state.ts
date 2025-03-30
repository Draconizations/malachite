import pkg from "../package.json" with { type: "json" }
import { _allowNavigation, _frames } from "./alpine.ts"
import Config from "./config.ts"
import { frameQueue, play } from "./engine.ts"
import { type FrameQueueEntry, runFrameQueue } from "./utils.ts"

type Data = {
	_frames: Record<string, string>
} & Record<string, any>

type Snapshot = {
	timestamp: string
	data: Data
}

export const emptyData: Data = {
	_frames: {},
}

export let _history: Snapshot[] = []
export let _index = -1
const _version = pkg.version

// max amount of states the history stack can have
export let max = Config.maxHistory

export const SaveType = {
	AUTO: 0,
	LOCAL: 1,
	FILE: 2,
}

/**
 * Initializes the state
 *
 * Called once on page load.
 * Should be called after userscripts are loaded.
 */
export function init() {
	// TODO: configurable autoloading, etc.

	load(getLocalSave())
}

export default {
	init,
}

/* ----------------------------------------------------------------------------
	HISTORY FUNCTIONS - manipulate the history array
---------------------------------------------------------------------------- */

/**
 * Gets the state from the history at the specified index. Defaults to the current state
 */
export function getState(index?: number) {
	const i = index ?? _index
	if (i === -1)
		return {
			timestamp: "",
			data: emptyData,
		}
	return _history[i]
}

/**
 * Jumps to a specific state in history.
 * @param target positive jumps forward, negative jumps backwards
 * @returns
 */
export function jump(target: number) {
	const t = target

	let tt = _index + t

	// don't jump too far if we're checking the boundaries
	if (tt < 0) tt = 0
	if (tt > _history.length - 1) tt = _history.length - 1

	if (tt === _index) return

	Object.entries(getState(tt).data._frames).forEach(([k, v]) => {
		frameQueue.set(k, {
			passage: v,
			doTransition: true,
			pushToState: false,
		})
	})

	_index = tt

	window.Alpine.store("story", getState().data)
	window.$s = window.Alpine.store("story") as any

	runFrameQueue(false, false, frameQueue)

	const frameMap = new Map<string, string>(
		Array.from(frameQueue.entries()).map(([k, v]) => [k, v.passage]),
	)

	// TODO: check if autosaving is enabled
	if (Config.allowSave(0 /* AUTO */, frameMap) === true) {
		setLocalSave(_history, _index)
	}

	updateNavigation()
}

/**
 * Pushes a new state onto the history stack, trimming the stack as needed.
 */
export function push(data: Data, frames?: Map<string, FrameQueueEntry>) {
	// check if we need to slice off future history
	if (_index < _history.length - 1) {
		_history.length = _index + 1
	}

	_index++

	// check how many snapshots we're over the maximum
	const extra = _history.length - max
	if (extra > 0) {
		_history.splice(0, extra)
		_index -= extra
	}

	saveState(data)

	const frameMap = new Map<string, string>(
		Array.from(frames?.entries() ?? []).map(([k, v]) => [k, v.passage]),
	)

	if (Config.allowSave(0 /* AUTO */, frameMap) === true) {
		setLocalSave(_history, _index)
	}

	updateNavigation()
}

/**
 * Saves the state to the current moment in history.
 * @param data
 */
export function saveState(data: Data) {
	const snap = createSnapshot(data)
	_history[_index] = snap
}

/**
 * Overwrites the current state with updated frames.
 *
 * This is needed because a frame render can cause other frames
 * to change or be intialized. Meaning that the snapshot created by a single push()
 * does not automatically reflect what the player can currently *see*.
 * @param frames frames to be updated
 */
export function updateFrames(frames: Map<string, FrameQueueEntry> = new Map()) {
	const frameMap = new Map<string, string>(
		Array.from(frames?.entries() ?? []).map(([k, v]) => [k, v.passage]),
	)

	// create a new snapshot for the current state
	saveState($s)
	if (Config.allowSave(0 /* AUTO */, frameMap) === true) {
		setLocalSave(_history, _index)
	}
}

/* ----------------------------------------------------------------------------
	SNAPSHOT FUNCTIONS - individual moments of state
---------------------------------------------------------------------------- */

/**
 * Creates a snapshot with a given data set.
 */
export function createSnapshot(data?: Data): Snapshot {
	const d = JSON.parse(JSON.stringify((data as Record<string, any>) ?? emptyData)) as Data

	// TODO: perform any data manipulation defined in user scripts here.

	// this shouldn't happen, but just in case someone overwrote the _frames object...
	// we'll convert a string/number value to the default frame's value
	if (typeof d._frames !== "object") {
		if (typeof d._frames === "string" || typeof d._frames === "number") {
			const value = d._frames
			d._frames = {}
			d._frames._ = value
		} else {
			// maybe handle other cases in the future, for now we don't care
			d._frames = {}
		}
	}

	return {
		data: d as Data,
		timestamp: new Date().toISOString(),
	}
}

/* ----------------------------------------------------------------------------
	DATA FUNCTIONS - loading / saving the game
---------------------------------------------------------------------------- */

/**
 * Loads in the save from the given data
 */
export function load(encodedData?: string) {
	// TODO: data validation?
	const data = encodedData
		? JSON.parse(encodedData)
		: {
				version: _version,
				history: [emptyData],
				index: 0,
			}

	_history = data.history
	_index = data.index
	max = 50

	window.Alpine.store("story", getState().data)
	window.$s = window.Alpine.store("story") as any

	if (Config.allowSave(0 /* AUTO */) === true) {
		setLocalSave(_history, _index)
	}

	updateNavigation()
}

/**
 * Retrieves a save stored in localstorage
 * @param index
 * @returns
 */
export function getLocalSave(index = -1) {
	const loc = localSaveLocation(index)

	const data = localStorage.getItem(loc)
	if (data) return data
}

/**
 * Creates a save and stores it in localstorage
 * @param history
 * @param current
 * @param index which save slot to use
 */
export function setLocalSave(history: any, current: number, index = -1, title?: string) {
	const loc = localSaveLocation(index)

	const data = {
		history,
		index: current,
		version: _version,
		timestamp: new Date().toISOString(),
		title,
	}

	localStorage.setItem(loc, JSON.stringify(data))

	return data
}

/* ----------------------------------------------------------------------------
	UTILITIES - useful for other functions!
---------------------------------------------------------------------------- */

/**
 * Gets the string to use as the localstorage save key
 * @param index save slot
 * @returns
 */
export function localSaveLocation(index = -1) {
	// TODO: configurable save location names
	const prefix = Config.localSaveName
	const name = "save"
	const separator = "."
	const i = index === -1 ? "auto" : index.toString()

	return [prefix, name, i].join(separator)
}

/**
 * Updates whether navigation is allowed whenever history changes
 */
function updateNavigation() {
	_allowNavigation.back = _index > 0
	_allowNavigation.forward = _index < _history.length - 1
}
