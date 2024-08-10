import nj from "nunjucks"
import markdown from "markdown-it"
import type Passage from "./passage.ts"

const md = markdown({
  html: true,
  xhtmlOut: true,
})

interface ParserRule {
  match: RegExp
  render: (res: RegExpExecArray | []) => string
}

export default class Markup {
  static nunjucks = nj.configure({
    autoescape: true,
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
   * Parses format-specific syntax like passage links and snippet references
   */
  static parse(source: string) {
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
      source = source.replaceAll(rule.match, (text) => rule.render(rule.match.exec(text) || []))
    })

    const renderSnippet = (name = "", attrs = "", content = "") => {
      if (!name) return ""
      let passage: Passage | null = null
      try {
        passage = window.Story.snippet(name)
      } catch (e) {
        console.error(new Error(`Could not render snippet: ${(e as Error).message}`))
      }

      if (!passage) return ""

      let context: Record<string, any> = {}

      let attrRegex = /([\w\-]+)\s*\=\s*"([\s\S]*?)"/g
      let stuff: RegExpExecArray | null
      while ((stuff = attrRegex.exec(attrs)) !== null) {
        context[stuff[1]] = stuff[2]
      }

      if (content) context.content = snippet(content)

      const snip = this.snippet(passage.source, context)
      return snip
    }

    const snippetRules: ParserRule[] = [
      {
        match: /<%([a-z][a-z0-9\-]*)(\s+([\s\S]*?))?%>(([\s\S]*?)<%\/\1%>)/g,
        render: ([_, name, _2, attrs = "", _4, content = ""]) => renderSnippet(name, attrs, content)
      },
      {
        match: /<%([a-z][a-z0-9\-]*)(\s+([\s\S]*?))?\/%>/g,
        render: ([_, name, _2, attrs = ""]) => renderSnippet(name, attrs)
      },
    ]

    function snippet(source: string) {
      let temp = source
      snippetRules.forEach((snippetRule) => {
        temp = temp.replaceAll(snippetRule.match, (text) =>
          snippetRule.render(snippetRule.match.exec(text) || [])
        )
      })
      return temp
    }

    source = snippet(source)
    return source
  }

  /**
   * Parses markdown (not snippets) and returns the parsed content
   */
  static markdown(source: string) {
    return md.render(source)
  }

  /**
   * Adds the needed event listeners to elements like passage links.
   */
  static addListeners() {
    document.querySelectorAll("tw-link").forEach((l) => {
      const dest = l.attributes.getNamedItem("data-destination")?.value
      const text = (l as HTMLElement).innerText
      const funcStr = l.attributes.getNamedItem("data-onclick")?.value

      if (!dest) {
        console.warn(`Could not find destination for link with text "${text}"`)
      }

      ;(l as HTMLButtonElement).addEventListener("click", function () {
        if (funcStr) eval(funcStr)
        if (dest) window.Engine.jump(dest)
      })

      ;(l as HTMLButtonElement).addEventListener("keypress", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return

        if (funcStr) eval(funcStr)
        if (dest) window.Engine.jump(dest)
      })
    })
  }

  /**
   * Renders a snippet and returns the rendered html
   */
  static snippet(source: string, context: Record<string, any>) {
    return this.nunjucks.renderString(source, context)
  }
}
