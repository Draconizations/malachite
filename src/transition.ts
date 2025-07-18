interface TransitionSettings {
	applyClass: boolean
	emitEvent: boolean
	delay: boolean
	bubble: boolean
	action?: () => void
}

function getTransitionDuration(el: Element) {
	return Number.parseFloat(window.getComputedStyle(el).transitionDuration) * 1000
}

export async function doTransition(el: Element, detail: any, settings: TransitionSettings) {
	if (settings.applyClass) el.classList.add("fadestart")
	if (settings.emitEvent)
		el.dispatchEvent(new CustomEvent("fadestart", { bubbles: settings.bubble, detail }))

	if (settings.delay) {
		const duration = getTransitionDuration(el)
		if (duration) await new Promise((res) => setTimeout(res, duration))
	}

	if (settings.action) settings.action()

	// middle of fade
	if (settings.applyClass) {
		el.classList.remove("fadestart")
		el.classList.add("fadeend")
	}

	if (settings.emitEvent)
		el.dispatchEvent(new CustomEvent("fade", { bubbles: settings.bubble, detail }))

	if (settings.delay) {
		const duration = getTransitionDuration(el)
		if (duration) await new Promise((res) => setTimeout(res, duration))
	}

	// end of fade
	if (settings.applyClass) el.classList.remove("fadeend")
	if (settings.emitEvent)
		el.dispatchEvent(new CustomEvent("fadeend", { bubbles: settings.bubble, detail }))
}
