import type Passage from "passage"

export default class Config {
	// STATE & SAVES
	static allowSave: (saveType: number, frames?: Map<string, string>) => boolean = () => {
		return true
	}

	// USER INTERFACE
	static storyInterface: ((start: string) => string) | undefined

	static frameClass = "mala-frame"

	static localSaveName = "mala"
}
