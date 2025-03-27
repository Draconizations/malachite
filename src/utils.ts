import { _frames } from "./alpine.ts"
import { play } from "./engine.ts"
import { allFrames, getFrame } from "./frame.ts"
import { overwrite } from "./state.ts"

export interface FrameQueueEntry {
	passage: string
	doTransition: boolean
	pushToState: boolean
}

export function getAttribute(el: Element | null, attr: string) {
	return el?.attributes.getNamedItem(attr)?.value || null
}

export function getTransitionDuration(el: Element) {
	return Number.parseFloat(window.getComputedStyle(el).transitionDuration) * 1000
}

export function runFrameQueue(pushToHistory: boolean, clearQueue: boolean, frameQueue: Map<string, FrameQueueEntry>) {
	if (frameQueue.size > 0) {
		frameQueue.forEach((v, k) => {
			const frame = getFrame(k)
			if (v.passage === frame.passage) return

			frame.passage = v.passage

			_frames[k] = {
				passage: v.passage,
				transition: v.doTransition,
			}
		})

		if (pushToHistory) play(frameQueue)

		allFrames().forEach((f) => {
			if (f.state && f.passage) $s._frames[f.name] = f.passage
		})

		overwrite(frameQueue)

		if (clearQueue) frameQueue.clear()
	}
}
