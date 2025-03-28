export default class Config {
	// STATE & SAVES
	static allowSave: (saveType: number, frames?: Map<string, string>) => boolean = () => {
		return true
	}
	static localSaveName = "mala"
	static maxHistory = 50

	// USER INTERFACE
	static storyInterface: ((start: string) => string) | undefined

	// FRAMES
	static frameClass = "mala-frame"
}
