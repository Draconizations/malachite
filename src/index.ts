import Engine from "./engine.ts"
import State from "./state.ts"
import Story from "./story.ts"

// initialize globals
window.Engine = new Engine()
window.Story = new Story()

window.State = new State()
window.s = window.State.store

// start the story
window.Engine.start()

declare global {
  interface Window {
    Engine: Engine
    Story: Story,
    State: State,
    s: Record<string,any>
  }
}
