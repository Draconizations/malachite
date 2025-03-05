import type { RuleInline } from "markdown-it/lib/parser_inline.mjs"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"

export const variableRule: RuleInline = (state) => {
  const pos = state.pos
  const max = state.posMax

  // quick fail if the first two characters aren't {{
  if (!(state.src.charCodeAt(pos) === 0x7B && state.src.charCodeAt(pos + 1) === 0x7B)) {
    return false
  }

  // okay, neat. let's regex it
  const regexp = /^{{ ?(\S+) ?}}/
  const text = state.src.slice(pos, max)

  const match = text.match(regexp)
  if (!match) return false

  state.pos = pos + match[0].length

  const token = state.push("mala_variable", "", 0)
  token.meta = match[1]

  return true
}

export const variableRender: RenderRule = (tokens, idx) => {
  const token = tokens[idx]
  const name = token.meta

  return `<span x-text="${name}"></span>`
}