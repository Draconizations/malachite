import Alpine from "./alpine.ts"
import Engine from "./engine.ts"
import Markup from "./markup/index.ts"
import State from "./state.ts"
import Story from "./story.ts"

// initialize globals
window.Engine = Engine()
window.Story = Story()
window.State = State()
window.Markup = Markup
window.Alpine = Alpine

window.Engine.init()
window.Story.init()

// TODO: load userscripts here

window.State.init()
window.Alpine.start()

// TODO: load any potential startup passages here?

window.Engine.start()

declare global {
	interface Window {
		Engine: ReturnType<typeof Engine>
		Story: ReturnType<typeof Story>
		State: ReturnType<typeof State>
		Markup: typeof Markup
		Alpine: Alpine.Alpine
		s: any // the persistent data store
	}
}
