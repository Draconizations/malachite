export default class Passage {
	name: string
	tags: string[]
	#source: string
	get source() {
		return this.#source
	}

	constructor(name: string, tags: string[], source: string) {
		this.name = name
		this.tags = tags
		this.#source = source
	}
}
