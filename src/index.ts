import Engine from "./engine.ts"
import Malachite from "./malachite.ts"
import State from "./state.ts"
import Story from "./story.ts"

// initialize globals
window.Engine = new Engine()
window.Story = new Story()

window.State = new State()
window.s = window.State.store

window.Malachite = new Malachite()
window.m = window.Malachite

// start the story
window.Engine.start()

declare global {
  interface Window {
    Engine: Engine
    Story: Story
    State: State
    s: Record<string, any>
    Malachite: Malachite
    m: Malachite
  }
}
