import { _frames } from "./alpine.ts"
import { getFrame } from "./frame.ts"

export function getAttribute(el: Element | null, attr: string) {
	return el?.attributes.getNamedItem(attr)?.value || null
}

export function getTransitionDuration(el: Element) {
	return (Number.parseFloat(window.getComputedStyle(el).transitionDuration) * 1000)
}

export function updateFrame(v: string, k: string, transition: boolean) {
	getFrame(k).passage = v
	_frames[k] = {
		passage: v,
		transition
	}
	if (getFrame(k).history) (Alpine.store("story") as any)._frames[k] = v
}