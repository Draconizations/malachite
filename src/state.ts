import pkg from "../package.json" with { type: "json" }
import Config from "./config.ts"

type Data = {
	_frames: Record<string, string>
} & Record<string, any>

type Snapshot = {
	title: string
	timestamp: string
	data: Data
}

export const emptyData: Data = {
	_frames: {},
}

let _history: Snapshot[] = []
let _index = -1
const _version = pkg.version

export let max = 50

export const SaveType = {
	AUTO: 0,
	LOCAL: 1,
	FILE: 2,
}

/**
 * Gets the current state in the history
 */
export function current() {
	if (_index === -1)
		return {
			title: "",
			timestamp: "",
			data: emptyData,
		}
	return _history[_index]
}


export function jump(target: number, checkBounds = true) {
	if (target === 0) return
	
	const min = _index * -1
	const max = _history.length - (_index + 1)

	let t = target
	// don't jump too far if we're checking the boundaries
	if (checkBounds && min) t = min
	if (checkBounds && target > max) t = max

	_index = t
	window.Alpine.store("story", current().data)
	window.$s = window.Alpine.store("story") as any
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

/**
 * Loads in the state from a specified source.
 */
export function load(encodedData?: string) {
	// TODO: data validation?
	const data = encodedData
		? JSON.parse(encodedData)
		: {
				version: _version,
				history: [],
				index: -1,
			}

	_history = data.history ?? []
	_index = data.index
	max = 50

	window.Alpine.store("story", current().data)
	window.$s = window.Alpine.store("story") as any
}

/**
 * Creates a new moment in the history, replacing the current moment with the new moment.
 */
export function push(data?: Data, title?: string) {
	const snap = snapshot(data, title)

	// check if we need to slice off future history
	if (_index >= _history.length) {
		_history.length = _index + 1
	}

	_history.push(snap)
	_index++

	// check how many snapshots we're over the maximum
	const extra = _history.length - max
	if (extra > 0) {
		_history.splice(0, extra)
		_index -= extra
	}

	// TODO: check if autosaving is enabled
	setLocalSave(_history, _index)
}

/**
 * Creates a snapshot with a given title and data set.
 */
export function snapshot(data?: Data, title?: string): Snapshot {
	const d = (data as Record<string, any>) ?? emptyData

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
		title: title ? title.toString() : "",
		data: d as Data,
		timestamp: new Date().toISOString(),
	}
}

function getLocalSave(index = -1) {
	const loc = location(index)

	const data = localStorage.getItem(loc)
	if (data) return data
}

function setLocalSave(history: any, current: number, index = -1) {
	const loc = location(index)

	localStorage.setItem(
		loc,
		JSON.stringify({
			history,
			index: current,
			version: _version,
		}),
	)
}

function location(index = -1) {
	// TODO: configurable save location names
	const prefix = Config.localSaveName
	const name = "save"
	const separator = "."
	const i = index === -1 ? "auto" : index.toString()

	return [prefix, name, i].join(separator)
}

export default {
	init
}