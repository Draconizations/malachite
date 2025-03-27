import { _frames } from "./alpine.ts"
import { play } from "./engine.ts"
import { allFrames, getFrame } from "./frame.ts"
import { overwrite } from "./state.ts"

export interface FrameQueueEntry {
	play: boolean
	passage: string
	transition: boolean
}

export function getAttribute(el: Element | null, attr: string) {
	return el?.attributes.getNamedItem(attr)?.value || null
}

export function getTransitionDuration(el: Element) {
	return Number.parseFloat(window.getComputedStyle(el).transitionDuration) * 1000
}

export function runFrameQueue(clear: boolean, frameQueue: Map<string, FrameQueueEntry>) {
	let shouldPlay = false
	if (frameQueue.size > 0) {
		frameQueue.forEach((v, k) => {
			if (getFrame(k).history && v.play) shouldPlay = true
			const frame = getFrame(k)
			const current = frame.passage
			if (v.passage === current) return

			frame.passage = v.passage

			_frames[k] = {
				passage: v.passage,
				transition: v.transition,
				play: v.play,
			}
		})

		if (clear) {
			if (shouldPlay) {
				play(frameQueue)
			}

			frameQueue.clear()
		}

		allFrames().forEach((f) => {
			if (f.history && f.passage) $s._frames[f.name] = f.passage
		})

		overwrite(frameQueue)
	}
}
