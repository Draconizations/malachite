import Markup from "./markup.ts"
import Passage from "./passage.ts"

export default class Snippet extends Passage {
  render() {
    let rendered = this.source

    try {
      rendered = Markup.snippet(rendered, {})
    } catch (e) {
      console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
    }

    return rendered
  }
}
