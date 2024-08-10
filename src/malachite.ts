import Engine from "./engine.ts";

export default class Malachite {
  engine: Engine = new Engine()
  
  start() {
    this.engine.start()
  }
}