export type State = ReturnType<typeof State>

type Data = {
	_frames: Record<string, string>
} & Record<string, any>

type Snapshot = {
	title: string,
	timestamp: string,
	data: Data
}

const emptyData: Data = {
	_frames: {}
}


export default function State() {
	let _history: Snapshot[] = []
	let _index = -1

	let max = 50;
	const _expired: string[] = []

	return {
		get current() {
			return _history[_index]
		},
		max,

		/**
		 * Initializes the state from a specified source.
		 * 
		 * Called once on page load, also called when loading past saves.
		 * Should be called after userscripts are loaded.
		 */
		init() {
			_history = []
			max = 50

			window.Alpine.store("story", emptyData)
			window.s = window.Alpine.store("story")
		},

		/**
		 * Creates a new moment in the history, replacing the current moment with the new moment.
		 */
		new(data?: Data, title?: string) {
			const snapshot = this.snapshot(data, title)
			
			// check if we need to slice off future history
			if (_index >= _history.length) {
				_history.length = _index + 1
			}

			_history.push(snapshot)
			_index++

			// check how many snapshots we're over the maximum
			const extra = _history.length - max
			if (extra > 0) {
				_history.splice(0, extra)
				_index -= extra
			}
		},

		/**
		 * Updates the alpine store object to reflect the specified snapshot.
		 */
		update(i: number = _index) {
			const snapshot = _history[i]

			window.Alpine.store("story", snapshot.data)
		},

		/**
		 * Creates a snapshot with a given title and data set.
		 */
		snapshot(data?: Data, title?: string): Snapshot {
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
				title: title ? title.toString() : '',
				data: d as Data,
				timestamp: new Date().toISOString()
			}
		}
	}
}