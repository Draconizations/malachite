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
    return Markup.parse(this.source)
  }
}
