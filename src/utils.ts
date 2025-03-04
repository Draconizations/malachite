export function getAttribute(el: Element | null, attr: string) {
	return el?.attributes.getNamedItem(attr)?.value || null
}
