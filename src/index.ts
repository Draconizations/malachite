import type Engine from "./engine.ts";
import Malachite from "./malachite.ts";
import Story from "./story.ts";

const malachite = new Malachite()

window.Engine = malachite.engine
window.Story = new Story()
window.Engine.start()

declare global {
  interface Window {
    Engine: Engine,
    Story: Story
  }
}