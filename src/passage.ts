import Markup from "./markup.ts"

/**
 * A singular twee passage.
 */
export default class Passage {
  name: string
  tags: string[]
  source: string

  constructor(name: string, tags: string[], source: string) {
    this.name = name
    this.tags = tags
    this.source = source
  }

  /**
   * Renders the passage contents and returns the rendered html.
   */
  render() {
    let rendered = this.source

    // TODO: make snippets their own separate class!
    if (this.tags.includes("snippet")) {
      try {
        rendered = Markup.snippet(rendered, {})
      } catch (e) {
        console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
      }
    } else {
      rendered = Markup.parse(rendered)
    }

    return rendered
  }
}
