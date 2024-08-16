import type { RuleInline } from "markdown-it/lib/parser_inline.mjs"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"

const linkRegex: Array<[RegExp, string[]]> = [
  [/^\[\[(.+?)\|(.+?)\]\s?(?:\[(.*?)\])?\]/, ["goto", "name", "func"]],
  [/^\[\[(.+?)\<\-(.+?)\]\s?(?:\[(.*?)\])?\]/, ["goto", "name", "func"]],
  [/^\[\[(.+?)\-\>(.+?)?\]\s?(?:\[(.*?)\])?\]/, ["name", "goto", "func"]],
  [/^\[\[(.+?)\]\s?(?:\[(.*?)\])?\]/, ["goto", "func"]],
]

export const linkRule: RuleInline = (state) => {
  const start = state.pos
  const max = state.posMax

  const meta = {
    name: "",
    goto: "",
    func: "",
  }

  if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false
  if (state.src.charCodeAt(start + 1) !== 0x5b) return false

  const text = state.src.slice(start, max)
  let match = null
  for (const regex of linkRegex) {
    match = text.match(regex[0])
    if (!match) continue
    for (let i = 0; i < regex[1].length; i++) {
      meta[regex[1][i] as keyof typeof meta] = match[i + 1]
    }
    break
  }

  if (!match) return false

  state.pos = start + match[0].length
  const token = state.push("tw_link", "", 0)
  token.meta = {}
  token.meta.name = meta.name
  token.meta.goto = meta.goto
  token.meta.func = meta.func

  return true
}

export const linkRender: RenderRule = (tokens, idx) => {
  const token = tokens[idx]
  const meta: {
    name: string
    goto: string
    func: string
  } = token.meta

  let func: Function | null = null
  if (meta.func) {
    try {
      func = new Function(meta.func)
    } catch (e) {
      console.warn(`Could not attach function to link "${meta.goto}: ${(e as Error).message}"`)
    }
  }

  let onClick = ""
  if (func || meta.goto) {
    onClick += 'onclick="'
    if (func)
      onClick += `${meta.func.replaceAll('"', "&quot;").replaceAll("'", '"').replaceAll("&quot;", "'")}; `
    if (meta.goto) onClick += ` window.Engine.jump('${meta.goto}')"`
  }

  const display = meta.name ? meta.name : meta.goto

  return `<button data-tw-link data-goto="${meta.goto}" ${onClick} >${display}</button>`
}
