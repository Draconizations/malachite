import type { RuleInline } from "markdown-it/lib/parser_inline.mjs"

export const variableRule: RuleInline = (state, silent) => {
  const start = state.pos

  let signal = false
  if (state.src.charCodeAt(start) === 0x40 /* @ */) signal = true
  else if (state.src.charCodeAt(start) !== 0x24 /* $ */) return false
}
