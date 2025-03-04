import Alpine from "./alpine.ts"
import Engine from "./engine.ts"
import State from "./state.ts"
import Story from "./story.ts"

// initialize globals
window.Story = new Story()

// AlpineJS shenanigans
window.Alpine = Alpine
window.Alpine.start()

window.State = new State()
window.s = Alpine.store("story")

window.Engine = new Engine()

Alpine.effect(() => {
	window.State.saveState(JSON.stringify(window.Alpine.store("story")))
})

declare global {
	interface Window {
		Story: Story
		Alpine: Alpine.Alpine
		Engine: Engine
		State: State
		s: any
	}
}
