import { unescape as unesc } from "html-escaper"
import Markdown, { type PluginSimple } from "markdown-it"
import { getTransitionDuration } from "../utils.ts"
import { linkRender, linkRule } from "./link.ts"
import { variableRender, variableRule } from "./variable.ts"

const plugin: PluginSimple = (md) => {
	md.configure("zero")
	md.inline.ruler.enable("escape")
	md.core.ruler.enable("text_join")
	md.inline.ruler.enable("html_inline")
	md.options.html = true
	md.options.xhtmlOut = true

	md.inline.ruler.after("html_inline", "mala_link", linkRule)
	md.renderer.rules.mala_link = linkRender

	md.inline.ruler.after("mala_link", "mala_variable", variableRule)
	md.renderer.rules.mala_variable = variableRender
	// md.enable("mala_variable")
}

const markdown = new Markdown().use(plugin)

export const markup = (source: string) => {
	return unesc(markdown.renderInline(source))
}

export const render = async (el: Element, source: string, skip?: boolean) => {
	const result = markup(source)
	// TODO: move all transitions to its own function
	let duration = getTransitionDuration(el)
	if (duration > 0 && skip !== true) {
		el.classList.add("fadestart")
		el.dispatchEvent(new CustomEvent("fadestart", { bubbles: false, detail: null }))
		await new Promise((res) => setTimeout(res, duration))
	}
	el.innerHTML = result
	if (duration > 0 && skip !== true) {
		el.classList.remove("fadestart")
		el.classList.add("fadeend")
		el.dispatchEvent(new CustomEvent("fade", { bubbles: false, detail: null }))
	}
	duration = getTransitionDuration(el)
	if (duration > 0 && skip !== true) {
		await new Promise((res) => setTimeout(res, duration))
		el.classList.remove("fadeend")
		el.dispatchEvent(new CustomEvent("fadeend", { bubbles: false, detail: null }))
	}
}
