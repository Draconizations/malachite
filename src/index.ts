import Engine from "./engine.ts"
import Story from "./story.ts"

// initialize globals
window.Engine = new Engine()
window.Story = new Story()

// start the story
window.Engine.start()

declare global {
  interface Window {
    Engine: Engine
    Story: Story
  }
}
