import Markup from "./markup/markup.ts"
import type Passage from "./passage.ts"
import type Snippet from "./snippet.ts"

/**
 * The story engine. It handles overarching utilities such as state, history and passage navigation.
 */
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
   * Finds, renders and displays the passage by the given name. Optionally ignores the history.
   */
  jump(name: string) {
    const html = this.render(name)
    if (html) this.show(html)
  }

  /**
   * Finds a passage by name, renders it, and returns the rendered HTML
   */
  render(name: string) {
    let passage: Passage
    try {
      passage = window.Story.passage(name)
    } catch (e) {
      console.warn(`Could not render passage: ${(e as Error).message}`)
      return
    }

    const html = passage.render()
    return html
  }

  /**
   * Finds a snippet by name, renders it, and returns the rendered HTML
   */
  snippet(name: string) {
    let snippet: Snippet
    try {
      snippet = window.Story.snippet(name)
    } catch (e) {
      console.warn(`Could not render snippet: ${(e as Error).message}`)
      return
    }

    const html = snippet.render()
    return html
  }

  /**
   * Displays the given html as the current passage. Does not handle history or state.
   */
  show(html: string) {
    this.innerHTML(this.#passageEl, html)
  }

  /**
   * Attaches the rendered HTML to the given HTML element and executes any included JS.
   */
  innerHTML(el: HTMLElement, html: string) {
    el.innerHTML = html
    Markup.executeScriptElements(el)
  }
}
