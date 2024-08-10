import type Engine from "./engine.ts";
import Malachite from "./malachite.ts";

const malachite = new Malachite()

window.Engine = malachite.engine
window.Engine.start()

declare global {
  interface Window {
    Engine: Engine
  }
}