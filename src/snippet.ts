import Markup from "./markup/markup.ts"
import type { EnvSnippet } from "./markup/snippets.ts"
import { uid } from "./markup/utils.ts"
import Passage from "./passage.ts"

export default class Snippet extends Passage {
  render(content?: string, context?: Record<string, any>, env?: any) {
    let html = this.source
    context = {}

    const envSnippet: EnvSnippet = {
      name: this.name,
      children: {
        source: this.source,
      },
      content: {
        source: content,
      },
      id: uid(),
      context,
    }

    try {
      html = Markup.snippet(html, context, env)
    } catch (e) {
      console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
    }

    const open = `<tw-snippet data-snippet-id="${envSnippet.id}">`
    const close = "</tw-snippet>"

    return `${open}${html}${close}`
  }
}
