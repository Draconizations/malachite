export function getAttribute(el: Element | null, attr: string) {
	return el?.attributes.getNamedItem(attr)?.value || null
}

export function getTransitionDuration(el: Element) {
	return (Number.parseFloat(window.getComputedStyle(el).transitionDuration) * 1000)
}