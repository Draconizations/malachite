import type { Options } from "markdown-it"
import type { RuleInline } from "markdown-it/lib/parser_inline.mjs"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"
import { derived, effect, signal } from "../signal.ts"
import { getPath, setPath } from "../state.ts"
import { type EnvSnippet, renderSnippet } from "./snippets.ts"

type Variable = {
  expression: string
  signal: boolean
  signifier: string
  path: string
}

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

      expr = state.src.slice(e, pos)
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
  if (state.env.js) token.meta.isJs = true
  if (state.env.snippet) token.meta.snippet = state.env.snippet

  const variable: Variable = {
    signal,
    signifier,
    expression: expr,
    path,
  }

  token.meta.variable = variable

  return true
}

export const variableRender: RenderRule = (tokens, idx, options, env) => {
  const token = tokens[idx]
  const path = token.meta.variable.path
  if (!path) throw new Error("Could not render variable: no path provided (this shouldn't happen!)")

  const derivedSignal = token.meta.variable.signifier?.includes("!")

  if (token.meta.variable.expression) {
    let fn: Function | null = null
    try {
      fn = new Function(
        `const value = ${token.meta.variable.expression}; if (typeof value === 'function') return value(); else return value;`
      )
    } catch (e) {
      console.warn(`Could not set variable ${token.meta.variable.name}: ${(e as Error).message}`)
    }

    // we got valid expression! set the variable to it
    if (fn) {
      if (token.meta.variable.signal) {
        if (getPath(path) !== undefined) setPath(path, fn())
        else {
          // @ denotes a signal
          if (!derivedSignal) setPath(path, signal(fn()))
          else setPath(path, derived(fn))

          if (token.meta.snippet && token.meta.isJs) {
            // re-render the snippet if the signal updates
            snippetEffect(token.meta.snippet, options, env)
          }
        }
      } else {
        // $ denotes a static variable
        setPath(path, fn())
      }
    }

    if (token.meta.isJs) return `s.${path}`
    return ""
  }

  // no expression found, so we display the variable instead
  if (token.meta.variable.signal) {
    // register a new effect that updates every element with that references this signal
    if (!token.meta.isJs) {
      effect(() => {
        document.querySelectorAll(`tw-var[data-signal="${path}"]`).forEach((i) => {
          ;(i as HTMLElement).innerHTML = getPath(path)
        })
      })
    }

    if (token.meta.snippet && token.meta.isJs && !env.effect) {
      // re-render the snippet every time the signal updates
      snippetEffect(token.meta.snippet, options, env)
    }
  }

  // return the raw value if we're in a js environment
  if (token.meta.isJs) return getPath(path)

  let print = getPath(path)
  if (typeof print === "object") print = JSON.stringify(print)

  // each signal value is displayed in a <tw-var> element with [data-signal="key"]
  // this gets updates whenever the effect function above re-runs
  return `<tw-var data-var="${path}" ${token.meta.variable.signal ? `data-signal="${path}"` : ""}>${print}</tw-var>`
}

function snippetEffect(snip: EnvSnippet, options: Options, env: any) {
  const snippet = window.Story.snippet(snip.name || "")

  env.effect = true

  if (snip && snippet) {
    effect(() => {
      const element =
        (document.querySelector(`tw-snippet[data-snippet-id="${snip.id}"]`) as HTMLElement) ||
        undefined

      const html = renderSnippet(snip, options, env)
      if (element) {
        window.Engine.innerHTML(element, html)
      }
    })
  }
}
