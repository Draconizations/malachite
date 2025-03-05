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

	return {
		get current() {
			return _history[_index]
		},
		max,

		/**
		 * Initializes the state
		 * 
		 * Called once on page load.
		 * Should be called after userscripts are loaded.
		 */
		init() {
			// TODO: configurable autoloading, etc.

			this.load(this.getLocalSave())
			window.s = window.Alpine.store("story")
		},

		/**
		 * Loads in the state from a specified source.
		 */
		load(encodedData?: string) {
			// TODO: data validation?
			const data = encodedData ? JSON.parse(encodedData) : {
				data: emptyData
			}

			_history = data.history ?? []
			max = 50

			window.Alpine.store("story", data.data)
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

			// TODO: check if autosaving is enabled
			this.setLocalSave(this.current)
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
		},

		getLocalSave(index = -1) {
			const location = this.location(index)

			const data = localStorage.getItem(location)
			if (data) return data			
		},

		setLocalSave(data: any, index = -1) {
			const location = this.location(index)

			localStorage.setItem(location, JSON.stringify(data))
		},

		location(index = -1) {
			// TODO: configurable save location names
			const prefix = "mala"
			const name = "save"
			const separator = "."
			const i = index === -1 ? "auto" : index.toString()

			return [prefix, name, i].join(separator)
		}
	}
}