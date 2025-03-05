export default class Passage {
	name: string
	tags: string[]
	source: string

	constructor(name: string, tags: string[], source: string) {
		this.name = name
		this.tags = tags
		this.source = source
	}
}
