export default class State {
	#store
	get store() {
		return this.#store
	}

	constructor() {
		this.#store = this.loadSave() || {
			frames: {},
		}
		console.log(this.#store)
		window.Alpine.store("story", this.#store)
	}

	loadSave(index?: number) {
		const i = index ?? 0
		const stored = localStorage.getItem(`mala-save-${i}`)
		if (!stored) {
			console.warn(`No save data found at index ${i} (this is normal on first load).`)
			return
		}
		return JSON.parse(stored)
	}

	saveState(data: any, index?: number) {
		const i = index ?? 0
		localStorage.setItem(`mala-save-${i}`, data)
	}
}
