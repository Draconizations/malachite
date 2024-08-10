import nj, { WebLoader } from "nunjucks"

export default class Markup {
  static nunjucks = nj.configure({
    autoescape: false
  })

  static unescape(text: string) {
    const unescapeRules: string[][] = [
      ["&amp;", "&"],
      ["&lt;", "<"],
      ["&gt;", ">"],
      ["&quot;", '"'],
      ["&#x27;", "'"],
      ["&#x60;", "`"],
    ]

    unescapeRules.forEach(([rule, out]) => {
      text = text.replaceAll(rule, out)
    })

    return text
  }

  /**
   * Renders a snippet and returns the rendered html
   */
  static snippet(source: string, context: Record<string,any>) {
    return this.nunjucks.renderString(source, context)
  }
}