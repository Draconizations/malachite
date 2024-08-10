import Markup from "./markup.ts"

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
    let result = this.source
    if (this.tags.includes("snippet")) {
      try {
        result = Markup.snippet(this.source, {})
      } catch (e) {
        console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
      }
    }

    return result
  }
}