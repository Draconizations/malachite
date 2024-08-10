import nj from "nunjucks"
import markdown from "markdown-it"

const md = markdown({
  html: true,
  xhtmlOut: true,
})

interface ParserRule {
  match: RegExp
  render: (res: RegExpExecArray|[]) => string
}

export default class Markup {
  static nunjucks = nj.configure({
    autoescape: false,
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

    linkRules.forEach(rule => {
      source = source.replaceAll(rule.match, (text) => rule.render(rule.match.exec(text) || []))
    })

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
    document.querySelectorAll("tw-link").forEach(l => {
      const dest = l.attributes.getNamedItem("data-destination")?.value
      const text = (l as HTMLElement).innerText
      const funcStr = l.attributes.getNamedItem("data-onclick")?.value

      if (!dest) {
        console.warn(`Could not find destination for link with text "${text}"`)
      }

      (l as HTMLButtonElement).addEventListener("click", function() {
        if (funcStr) eval(funcStr)
        if (dest) window.Engine.jump(dest)
      });

      (l as HTMLButtonElement).addEventListener("keypress", function(e) {
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
