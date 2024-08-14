import markdown from "markdown-it"
import nj from "nunjucks"
import type Conditional from "./conditional.ts"
import { derived, effect, signal } from "./signal.ts"
import type Snippet from "./snippet.ts"
import { getPath, setPath } from "./state.ts"

// markdown-it environment
export const md = markdown({
  html: true,
  xhtmlOut: true,
})

/**
 * A rule used for parsing content utilizing regex.
 */
interface ParserRule {
  match: RegExp
  render: (match: string, ...args: any[]) => string
}

interface ContextParserRule {
  match: RegExp
  render: (context: Record<string, any>, match: string, ...args: any[]) => string
}

/**
 * Handles parsing and rendering of Malachite Markup (Malarkup)
 */
export default class Markup {
  // nunjucks environment
  static nunjucks = nj.configure({
    autoescape: false, // render html into snippet content by default
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
    source = this.variables(source)
    source = this.conditionals(source)
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
    const linkRules: ParserRule[] = [
      {
        match: /(\*)?\[\[(?:(.+?)(?:\|(.+?))?\])\s*(?:\[(.*?)\])?\]/g,
        render: (m, esc = "", dest = "", text = "", func = "") => {
          if (esc) return m.replace(esc, "")
          return `<button data-tw-link data-destination="${dest}" ${func ? `data-onclick="${func.replaceAll(`"`, `'`)}"` : ""}>${text ? text : dest}</button>`
        },
      },
    ]

    linkRules.forEach((rule) => {
      // match and replace each link
      source = source.replaceAll(rule.match, rule.render)
    })

    return source
  }

  /**
   * Renders passage variable declarations and handles variable declaration and assignments.
   */
  static variables(source: string) {
    const varRules: ParserRule[] = [
      {
        match: /(\\?)(\@|\$)(\!)?([\.\_\w\d]+)(?:\(([\s\S]*?)\);|\(([\s\S]*?)\))?/g,
        render: (
          m = "",
          esc = "",
          prefix = "",
          d = "",
          key = "",
          greedyExpr = "",
          lazyExpr = ""
        ) => {
          if (esc) return m.replace(esc, "")
          // check if there's an expression included
          // the greedy expression ends in a semicolon ();
          // this allows one to use arrow functions inside variable assignments
          if (greedyExpr || lazyExpr) {
            let fn: Function | null = null
            try {
              fn = new Function(
                `const value = ${greedyExpr ? greedyExpr : lazyExpr}; if (typeof value === 'function') return value(); else return value;`
              )
            } catch (e) {
              console.error(e)
            }

            // we got valid expression! set the variable to it
            if (fn) {
              if (getPath(key) !== undefined) setPath(key, fn())
              else if (prefix === "@") {
                // @ denotes a signal
                if (!d) setPath(key, signal(fn()))
                else if (d === "!") setPath(key, derived(fn))
                // not a signal
              } else if (prefix === "$") {
                // $ denotes a static variable
                setPath(key, fn())
              }
            }
            return ""
          }
          // no expression found, so we display the variable instead
          if (prefix === "@") {
            // register a new effect that updates every element with that references this signal
            effect(() => {
              document.querySelectorAll(`tw-var[data-signal="${key}"]`).forEach((i) => {
                ;(i as HTMLElement).innerHTML = getPath(key)
              })
            })
          }

          let print = getPath(key)
          if (typeof print === "object") print = JSON.stringify(print)

          // each signal value is displayed in a <tw-var> element with [data-signal="key"]
          // this gets updates whenever the effect function above re-runs
          return `<tw-var data-var="${key}" ${prefix === "@" ? `data-signal="${key}"` : ""} style="display: contents; ">${print}</tw-var>`
        },
      },
    ]
    varRules.forEach((rule) => {
      source = source.replaceAll(rule.match, rule.render)
    })

    return source
  }

  static conditionals(source: string) {
    const conditionRegex =
      /(\\)?#(if|elseif|else|elif)(?:\(([\s\S]*)\))?\s?(?:{([\s\S]*)};|{([\s\S]*?)})/gi

    const matches = source.matchAll(conditionRegex)

    let conditional: Conditional | null = null

    for (const match of matches) {
      const [m, esc, statement, expression = "", greedyContent = "", lazyContent = ""] = match
      const s = statement.toLowerCase()

      // end the conditional if one of the statements was escaped
      if (esc) {
        if (conditional) conditional.render()
        continue
      }

      if (!expression && s !== "else") {
        console.warn(`Expression required for ${s} statement:\n${m}`)
        conditional = null
        continue
      }

      if (expression && s === "else") {
        console.warn(`Expression not allowed for else statement:\m${m}`)
      }
    }
  }

  /**
   * Parses snippet blocks and renders them recursively. Returns the rendered source.
   */
  static snippets(source: string) {
    const snippetRules: ContextParserRule[] = [
      {
        match:
          /<%(\\?)\s?([a-z][a-z0-9\-]*)(?:\s+([\s\S]*?))?%>(?:([\s\S]*?)<(?:%\/|\/%)\s?\2\s?%>)/g,
        render: (context, m, esc, name, attrs = "", content = "") => {
          if (esc) return m.replace(esc, "")
          return renderSnippet(context, esc, name, attrs, content)
        },
      },
      {
        match: /<%(\\?)\s?([a-z][a-z0-9\-]*)(?:\s+([\s\S]*?))?(?:\/\%|%\/)>/g,
        render: (context, m, esc, name, attrs = "") => {
          if (esc) return m.replace(esc, "")
          return renderSnippet(context, esc, name, attrs)
        },
      },
    ]

    // this gets called recursively as long as the latest snippet has content
    function snippet(source: string, context: Record<string, any>) {
      snippetRules.forEach((snippetRule) => {
        // match and replace each snippet tag
        source = source.replaceAll(snippetRule.match, (m, esc, name, attrs, content) =>
          snippetRule.render(context, m, esc, name, attrs, content)
        )
      })
      return source
    }

    const renderSnippet = (
      parentContext: Record<string, any> = {},
      _ = "",
      name = "",
      attrs = "",
      content = ""
    ) => {
      // this shouldn't happen, but just in case.
      if (!name) return ""

      let snip: Snippet | null = null
      try {
        snip = window.Story.snippet(name)
      } catch (e) {
        // failing to find a snippet by name throws an error, so we catch it here
        console.warn(`Could not render snippet: ${(e as Error).message}`)
      }
      if (!snip) return ""

      const newContext: Record<string, any> = {}
      const attrRegex = /([\w\-]+)\s*\=\s*"([\s\S]*?)"/g
      let regexArray: RegExpExecArray | null
      // [...attrs.matchAll(attrRegex)] does not return what we want. thanks typescript
      // so we iterate over the attributes this way instead.
      while ((regexArray = attrRegex.exec(attrs)) !== null) {
        newContext[regexArray[1]] = regexArray[2]
      }

      const context = Object.assign(parentContext, newContext, { content: "" })

      // render snippet content as well, to allow for nesting
      if (content) context.content = snippet(content, context)

      return this.snippet(snip.source, context)
    }

    source = snippet(source, {})
    return source
  }

  /**
   * Renders a snippet and returns the rendered html
   */
  static snippet(source: string, context: Record<string, any> = {}) {
    source = this.nunjucks.renderString(source, context)
    source = this.links(source)
    source = this.variables(source)
    return source
  }

  /**
   * Adds event listeners to to make elements like passage links functional.
   */
  static addListeners() {
    // TODO: move each listener type to its own method
    document.querySelectorAll("[data-tw-link]").forEach((l) => {
      // get each link's attribute
      const dest = l.attributes.getNamedItem("data-destination")?.value
      const text = (l as HTMLElement).innerText
      const funcStr = l.attributes.getNamedItem("data-onclick")?.value

      if (!dest) {
        console.warn(`Could not find destination for link with text "${text}"`)
      }
      // add the onclick event listener
      ;(l as HTMLButtonElement).addEventListener("click", () => {
        if (funcStr) new Function(funcStr)()
        if (dest) window.Engine.jump(dest)
      })
    })
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
