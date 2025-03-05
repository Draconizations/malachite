import { unescape as unesc } from "html-escaper"

export default class Passage {
	name: string
	tags: string[]
	source: string

	constructor(name: string, tags: string[], source: string) {
		this.name = name
		this.tags = tags
		this.source = unesc(source)
	}
}
