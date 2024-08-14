import markdown from "markdown-it"
import { variableRule } from "./variables.ts"

// markdown-it environment
export const md = markdown({
  html: true,
  xhtmlOut: true,
})

export const malaMd = markdown().use((md) => {
  md.inline.ruler.after("text", "variable", variableRule)

  md.core.ruler.enableOnly(["text_join", "inline"])

  md.inline.ruler.enableOnly(["text", "escape"])
})
