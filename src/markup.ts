import nj from "nunjucks"
import markdown from "markdown-it"
import type Passage from "./passage.ts"
import type Snippet from "./snippet.ts"

// markdown-it environment
const md = markdown({
  html: true,
  xhtmlOut: true,
})

/**
 * A rule used for parsing content utilizing regex.
 */
interface ParserRule {
  match: RegExp
  render: (res: RegExpExecArray | []) => string
}

/**
 * Handles parsing and rendering of Malachite Markup (Malarkup)
 */
export default class Markup {
  // nunjucks environment
  static nunjucks = nj.configure({
    autoescape: true, // do not render html into snippet content by default
  })

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
   * Parses raw passage content and returns the rendered passage. It does not handle unescaping.
   */
  static parse(source: string) {
    source = this.links(source)
    source = this.snippets(source)
    source = this.markdown(source)
    return source
  }

  /**
   * Renders markdown and returns the rendered source.
   */
  static markdown(source: string) {
    return md.render(source)
  }

  /**
   * Renders passage link markup and returns the rendered source.
   *
   * NOTE: This does not attach the event listeners to the links, as the links need to be attached to the DOM first.
   */
  static links(source: string) {
    // default twine link
    const twineLink = (dest: string = "", text: string = "", func: string = "") =>
      `<tw-link role="button" tabindex="0" data-destination="${dest}" ${func ? `data-onclick="${func}"` : ""}>${text}</tw-link>`

    const linkRules: ParserRule[] = [
      {
        match: /\[\[(.+?)\|(.+?)\]\s?\[(.+?)\]\]/g,
        render: ([_, dest, text, func]) => twineLink(dest, text, func),
      },
      {
        match: /\[\[(.+?)\]\s?\[(.+?)\]\]/g,
        render: ([_, dest, func]) => twineLink(dest, dest, func),
      },
      {
        match: /\[\[(.+?)\|(.+?)\]\]/g,
        render: ([_, dest, text]) => twineLink(dest, text),
      },
      {
        match: /\[\[(.+?)\]\]/g,
        render: ([_, dest]) => twineLink(dest, dest),
      },
    ]

    linkRules.forEach((rule) => {
      // match and replace each link
      source = source.replaceAll(rule.match, (text) => rule.render(rule.match.exec(text) || []))
    })

    return source
  }

  /**
   * Parses snippet blocks and renders them recursively. Returns the rendered source.
   */
  static snippets(source: string) {
    const snippetRules: ParserRule[] = [
      {
        match: /<%([a-z][a-z0-9\-]*)(\s+([\s\S]*?))?%>(([\s\S]*?)<%\/\1%>)/g,
        render: ([_, name, _2, attrs = "", _4, content = ""]) =>
          renderSnippet(name, attrs, content),
      },
      {
        match: /<%([a-z][a-z0-9\-]*)(\s+([\s\S]*?))?\/%>/g,
        render: ([_, name, _2, attrs = ""]) => renderSnippet(name, attrs),
      },
    ]

    // this gets called recursively as long as the latest snippet has content
    function snippet(source: string) {
      snippetRules.forEach((snippetRule) => {
        // match and replace each snippet tag
        source = source.replaceAll(snippetRule.match, (text) =>
          snippetRule.render(snippetRule.match.exec(text) || [])
        )
      })
      return source
    }

    const renderSnippet = (name = "", attrs = "", content = "") => {
      // this shouldn't happen, but just in case.
      if (!name) return ""

      let snip: Snippet | null = null
      try {
        snip = window.Story.snippet(name)
      } catch (e) {
        // failing to find a snippet by name throws an error, so we catch it here
        console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
      }
      if (!snip) return ""

      let context: Record<string, any> = {}
      let attrRegex = /([\w\-]+)\s*\=\s*"([\s\S]*?)"/g
      let regexArray: RegExpExecArray | null
      // [...attrs.matchAll(attrRegex)] does not return what we want. thanks typescript
      // so we iterate over the attributes this way instead.
      while ((regexArray = attrRegex.exec(attrs)) !== null) {
        context[regexArray[1]] = regexArray[2]
      }
      // render snippet content as well, to allow for nesting
      if (content) context.content = snippet(content)

      return this.snippet(snip.source, context)
    }

    source = snippet(source)
    return source
  }

  /**
   * Renders a snippet and returns the rendered html
   */
  static snippet(source: string, context: Record<string, any>) {
    return this.nunjucks.renderString(source, context)
  }

  /**
   * Adds event listeners to to make elements like passage links functional.
   */
  static addListeners() {
    // TODO: move each listener type to its own method
    document.querySelectorAll("tw-link").forEach((l) => {
      // get each link's attribute
      const dest = l.attributes.getNamedItem("data-destination")?.value
      const text = (l as HTMLElement).innerText
      const funcStr = l.attributes.getNamedItem("data-onclick")?.value

      if (!dest) {
        console.warn(`Could not find destination for link with text "${text}"`)
      }

      // add the onclick event listener
      ;(l as HTMLButtonElement).addEventListener("click", function () {
        if (funcStr) new Function(funcStr)
        if (dest) window.Engine.jump(dest)
      })
      // also add the keypress event listener, as role="button" does not handle this automatically
      ;(l as HTMLButtonElement).addEventListener("keypress", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return

        if (funcStr) new Function(funcStr)
        if (dest) window.Engine.jump(dest)
      })
    })
  }
}
