import type { RuleInline } from "markdown-it/lib/parser_inline.mjs"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"
import { derived, effect, signal } from "../signal.ts"
import { getPath, setPath } from "../state.ts"
import Markup from "./markup.ts"

export const variableRule: RuleInline = (state) => {
  const start = state.pos
  const max = state.posMax

  let signal = false
  if (state.src.charCodeAt(start) === 0x40 /* @ */) signal = true
  else if (state.src.charCodeAt(start) !== 0x24 /* $ */) return false

  const match = state.src.slice(start, max).match(/^(?:\@|\$)(\!)?([\.\_\w\d]+)/)
  if (!match) return false

  const [m, signifier, path] = match

  // if we're here, we found a variable
  // see if it's a display or an assignment
  const o = start + match[0].length
  let display = false
  if (state.src.charCodeAt(o) !== 0x28 /* ( */) display = true

  // if it's not a display, let's find the closing bracket
  let expr = ""
  if (!display) {
    const e = o + 1
    let pos = e
    let valid = false

    for (; pos < max; pos++) {
      if (state.src.charCodeAt(pos) !== 0x29 /* ) */) continue

      expr += state.src.slice(e, pos)
      // check if this is a valid expression
      try {
        new Function(
          `const value = ${expr}; if (typeof value === 'function') return value(); else return value;`
        )
        // no error? we got a valid expression!
        valid = true
        break
      } catch (_) {
        // not a valid expression. swallow the error and continue
      }
    }

    if (!valid) {
      // we got all the way to the end without finding a valid expression
      return false
    }

    state.pos = pos + 1
  } else state.pos = start + m.length

  const token = state.push("variable", "", 0)
  token.meta = {}
  token.meta.expression = expr
  token.meta.signal = signal
  token.meta.path = path
  token.meta.signifier = signifier
  if (state.env.js) token.meta.isJs = true

  return true
}

export const variableRender: RenderRule = (tokens, idx, _, env) => {
  const token = tokens[idx]
  const path = token.meta.path
  if (!path) throw new Error("Could not render variable: no path provided (this shouldn't happen!)")

  const derivedSignal = token.meta.signifier?.includes("!")

  if (token.meta.expression) {
    let fn: Function | null = null
    try {
      fn = new Function(
        `const value = ${token.meta.expression}; if (typeof value === 'function') return value(); else return value;`
      )
    } catch (e) {
      console.error(e)
    }

    // we got valid expression! set the variable to it
    if (fn && env.effect !== true) {
      if (token.meta.signal && !env.effect) {
        if (getPath(path) !== undefined) setPath(path, fn())
        // @ denotes a signal
        else if (!derivedSignal) setPath(path, signal(fn()))
        else setPath(path, derived(fn))

        if (env.snippet !== undefined && token.meta.isJs) {
          // re-render the snippet if the signal updates
          snippetEffect(path, env)
        }
      } else if (!env.effect) {
        // $ denotes a static variable
        setPath(path, fn())
      }
    }

    if (token.meta.isJs) return `s.${path}`
    return ""
  }

  // no expression found, so we display the variable instead
  if (token.meta.signal) {
    // register a new effect that updates every element with that references this signal
    if (!token.meta.isJs) {
      effect(() => {
        document.querySelectorAll(`tw-var[data-signal="${path}"]`).forEach((i) => {
          ;(i as HTMLElement).innerHTML = getPath(path)
        })
      })
    }

    if (env.snippet !== undefined && token.meta.isJs && !env.effect) {
      // re-render the snippet every time the signal updates
      snippetEffect(path, env)
    }
  }

  let print = getPath(path)
  if (typeof print === "object") print = JSON.stringify(print)

  // return the raw value if we're in a js environment
  if (token.meta.isJs) return `s.${path}`

  // each signal value is displayed in a <tw-var> element with [data-signal="key"]
  // this gets updates whenever the effect function above re-runs
  return `<tw-var data-var="${path}" ${token.meta.signal ? `data-signal="${path}"` : ""}>${print}</tw-var>`
}

function snippetEffect(path: string, env: any) {
  const snippet = window.State.snippets.get(env.snippet)

  if (!snippet) throw Error(`Snippet with id ${env.snippet} not found`)

  if (snippet) {
    effect(() => {
      const _ = getPath(path)
      if (!snippet.element)
        snippet.element =
          (document.querySelector(`tw-snippet[data-snippet-id="${env.snippet}"]`) as HTMLElement) ||
          undefined
      if (snippet.element) {
        const html = Markup.snippet(
          snippet.snippet.source,
          Object.assign(snippet.context, { s: window.s }),
          { ...env, effect: true }
        )
        window.Engine.innerHTML(snippet.element, html)
      }
    })
  }
}
