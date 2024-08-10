import Markup from "./markup.ts";
import type Passage from "./passage.ts";
import Story from "./story.ts";

export default class Engine {
  #passageEl: HTMLElement

  constructor() {
    // init with the passage element
    const passageEl = document.querySelector("tw-passage")
    if (!passageEl) throw new Error("tw-passage element is missing!")
    this.#passageEl = passageEl as HTMLElement
  }

  start() {
    this.jump(window.Story.startPassage)
  }

  /**
   * Finds, renders and displays the passage by the given name. 
  */
  jump(name: string) {
    let passage: Passage
    try {
      passage = window.Story.passage(name)
    } catch (e) {
      console.error(new Error(`Could not jump to passage: ${(e as Error).message}`))
      return
    }

    let html = passage.render()

    this.show(html)
  }

  show(html: string) {
    this.#passageEl.innerHTML = html
    Markup.addListeners()
  }
}