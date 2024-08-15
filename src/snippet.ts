import Markup from "./markup/markup.ts"
import Passage from "./passage.ts"

export default class Snippet extends Passage {
  render(env?: any) {
    let rendered = this.source

    try {
      rendered = Markup.snippet(rendered, {}, env)
    } catch (e) {
      console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
    }

    return rendered
  }
}
