import Markdown, { type Options, type PluginSimple } from "markdown-it"
import type { Renderer, Token } from "markdown-it/index.js"
import type { RuleBlock } from "markdown-it/lib/parser_block.mjs"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"
import { linkRender, linkRule } from "./links.ts"
import { isJsRule, snippetRender, snippetRule } from "./snippets.ts"
import { variableRule } from "./variables.ts"
import { variableRender } from "./variables.ts"

// markdown-it environment
export const md = new Markdown({
  html: true,
  xhtmlOut: true,
})

const noParagraphRule: RuleBlock = (state, startLine, endLine) => {
  state.line = endLine

  const token = state.push("inline", "", 0)
  token.content = state.src
  token.map = [startLine, endLine]
  token.children = []

  return true
}

const noParagraphRender: RenderRule = () => {
  return ""
}

const plugin: PluginSimple = (md) => {
  md.configure("zero")
  md.block.ruler.disable("paragraph")
  md.inline.ruler.enable("escape")
  md.core.ruler.enable("text_join")
  md.block.ruler.enable("fence")

  md.block.ruler.after("html_block", "no_paragraph", noParagraphRule)
  md.inline.ruler.after("text", "nunjucks_js", isJsRule)
  md.inline.ruler.after("nunjucks_js", "variable", variableRule)
  md.inline.ruler.after("variable", "tw_link", linkRule)
  md.inline.ruler.after("tw_link", "snippet", snippetRule)

  md.enable("nunjucks_js").enable("snippet").enable("variable").enable("no_paragraph")

  md.renderer.render = (tokens, options, env) => customRender(tokens, options, env, md.renderer)

  md.renderer.rules.variable = variableRender
  md.renderer.rules.no_paragraph = noParagraphRender
  md.renderer.rules.tw_link = linkRender
}

export const snippetMd = new Markdown().use(plugin)

export const passageMd = new Markdown().use(plugin).disable(["nunjucks_js"])

export const jsMd = new Markdown()
  .use(plugin)
  .disable(["nunjucks_js", "snippet", "html_block", "fence", "escape", "text_join"])

function customRender(tokens: Token[], options: Options, env: any, renderer: Renderer) {
  const rules = renderer.rules
  let result = ""

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i]
    const type = token.type

    const rule = rules[type as keyof typeof rules]

    if (token.children) {
      if (type === "snippet") result += snippetRender(tokens, i, options, env, renderer)
      else result += customRender(token.children, options, env, renderer)
    } else if (rule) result += rule(tokens, i, options, env, renderer)
  }

  return result
}
