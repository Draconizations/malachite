/*
  This file contains some markdown rules for syntax used in snippets specifically
  Either to detect the start of a snippet and render its contents
  Or to check if a variable should be a display or a reference
*/

import type { Options } from "markdown-it"
import type { Token } from "markdown-it/index.js"
import type { RuleInline } from "markdown-it/lib/parser_inline.mjs"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"
import { jsMd, md, snippetMd } from "./markdown.ts"
import Markup, { nunjucks } from "./markup.ts"
import { uid } from "./utils.ts"

const stringAttrRegex = /([\w\-]+)\s*\="([\s\S]*?)"/g
const jsAttrRegex = /([\w\-]+)\s*\={([\s\S]*?)}/g
const blockRegex =
  /^<%\s?([a-z][a-z0-9\-]*)(?:\s+([\s\S]*?))?%>(?:([\s\S]*?)<(?:%\/|\/%)\s?\1\s?%>)/i
const selfClosingRegex = /^<%\s?([a-z][a-z0-9\-]*)(?:\s+([\s\S]*?))?(?:\/\%|%\/)>/i

export type EnvSnippet = {
  name: string
  id: string
  tags: string[]
  raw: boolean
  content: {
    tokens?: Token[]
    source?: string
  }
  source: {
    tokens?: Token[]
    source?: string
  }
  context: Record<string, any>
}

export const snippetRule: RuleInline = (state) => {
  const start = state.pos
  const max = state.posMax

  const text = state.src.slice(start, max + 1)

  let match = text.match(blockRegex)
  if (!match) match = text.match(selfClosingRegex)

  // no snippet match found
  if (!match) return false

  // we got a snippet!
  const [m, name = "", attributes = "", content = ""] = match
  const end = start + m.length

  // this shouldn't happen, but just in case
  if (!name) return false

  state.pos = end

  if (!name) throw new Error("No snippet name found (this shouldn't happen!)")
  const snippet = window.Story.snippet(name)

  const token = state.push("snippet", "tw-snippet", 0)
  token.meta = {}
  const id = uid()

  const envSnippet: EnvSnippet = {
    id,
    name,
    content: {
      source: content,
    },
    source: {
      source: snippet.source,
    },
    context: {},
    raw: snippet.raw,
    tags: snippet.tags,
  }

  const stringAttrs: Record<string, any> = {}
  if (attributes) {
    let strArray: RegExpExecArray | null
    // [...attrs.matchAll(attrRegex)] does not return what we want. thanks typescript
    // so we iterate over the attributes this way instead.
    while ((strArray = stringAttrRegex.exec(attributes)) !== null) {
      stringAttrs[strArray[1]] = strArray[2]
    }
  }

  const jsAttrs: Record<string, any> = {}
  if (attributes) {
    let jsArray: RegExpExecArray | null
    // [...attrs.matchAll(attrRegex)] does not return what we want. thanks typescript
    // so we iterate over the attributes this way instead.
    while ((jsArray = jsAttrRegex.exec(attributes)) !== null) {
      const attr = Markup.unescape(jsMd.renderInline(jsArray[2], { snippet: envSnippet, js: true }))
      try {
        const value = new Function(
          `const value = ${attr}; if (typeof value === 'function') return value(); else return value;`
        )
        jsArray[1] = value()
      } catch (e) {
        console.warn(`Could not set attribute ${jsArray[1]}: ${(e as Error).message}`)
      }
    }
  }

  let context = { ...stringAttrs, ...jsAttrs }
  if (state.env.snippet?.context) context = { ...state.env.snippet?.context, ...context }
  context = { ...context, s: window.s }

  envSnippet.context = context

  const sourceTokens: Token[] = []
  snippetMd.inline.parse(
    snippet.source,
    state.md,
    { ...state.env, snippet: envSnippet },
    sourceTokens
  )
  token.children = sourceTokens

  const contentTokens: Token[] = []
  snippetMd.inline.parse(content, state.md, { ...state.env, snippet: envSnippet }, contentTokens)

  envSnippet.source.tokens = token.children
  envSnippet.content.tokens = contentTokens

  state.env.snippet = envSnippet
  token.meta.snippet = envSnippet

  return true
}

const jsTags = [/^{{[\s\S]*?}}/, /{%[\s\S]*?%}/]

export const isJsRule: RuleInline = (state) => {
  const start = state.pos
  const max = state.posMax

  if (state.src.charCodeAt(start) !== 0x7b /* { */) return false

  let open = ""
  let close = ""

  const char = state.src.charCodeAt(start + 1)
  if (char === 0x7b) {
    open = "{{"
    close = "}}"
  } else if (char === 0x25 /* % */) {
    open = "{%"
    close = "%}"
  } else return false

  const text = state.src.slice(start, max)

  let match: RegExpMatchArray | null = null

  for (const tag of jsTags) {
    match = text.match(tag)
    if (match) break
  }

  if (!match) return false

  // got a js sequence, push the token
  const end = start + match[0].length
  state.pos = end

  const tokens: Token[] = []
  const content = match[0]
  jsMd.inline.parse(match[0], state.md, { ...state.env, ...{ js: true } }, tokens)

  const token = state.push("nunjucks_js", "", 0)
  token.content = content
  token.children = tokens
  token.meta = {}
  token.meta.open = open
  token.meta.close = close

  return true
}

export const snippetRender: RenderRule = (tokens, idx, options, env) => {
  const token = tokens[idx]

  const envSnippet: EnvSnippet = token.meta.snippet

  const html = renderSnippet(envSnippet, options, env)

  const open = `<tw-snippet data-snippet-id="${token.meta.snippet.id}">`
  const close = "</tw-snippet>"

  return `${open}${html}${close}`
}

export function renderSnippet(snippet: EnvSnippet, options: Options, env: any) {
  const snippetEnv = { ...env, snippet }

  let result = snippetMd.renderer.render(snippet.source.tokens || [], options, snippetEnv)
  result = Markup.unescape(result)

  let nested = ""
  if (snippet.content.tokens)
    nested = snippetMd.renderer.render(snippet.content.tokens, options, snippetEnv)
  nested = md.render(nested)
  snippet.context.content = nested

  result = nunjucks.renderString(result, snippet.context)

  return result
}
