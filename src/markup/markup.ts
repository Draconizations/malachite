import nj from "nunjucks"
import { md, passageMd, snippetMd } from "./markdown.ts"

export const nunjucks = nj.configure({
  autoescape: false, // render html into snippet content by default
})

export default class Markup {
  static snippet(source: string, context: Record<string, any>, env?: any) {
    context.s = window.s

    source = snippetMd.render(source, env)
    source = this.unescape(source)
    source = nunjucks.renderString(source, context)

    return source
  }

  /**
   * Converts escaped HTML characters back into the original characters
   */
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
   * Parses raw passage content and returns the rendered passage.
   */
  static parse(source: string) {
    source = passageMd.render(source)
    source = this.unescape(source)
    source = md.render(source)
    return source
  }

  /**
   * Finds and executes any script element in the passage body
   */
  static executeScriptElements(containerElement: HTMLElement) {
    // taken from https://stackoverflow.com/a/69190644
    const scriptElements = containerElement.querySelectorAll("script")

    scriptElements?.forEach((scriptElement) => {
      const clonedElement = document.createElement("script")

      Array.from(scriptElement.attributes).forEach((attribute) => {
        clonedElement.setAttribute(attribute.name, attribute.value)
      })

      clonedElement.text = scriptElement.text

      scriptElement.parentNode?.replaceChild(clonedElement, scriptElement)
    })
  }
}
