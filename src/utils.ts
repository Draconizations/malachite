import { _frames } from "./alpine.ts"
import { play } from "./engine.ts"
import { allFrames, getFrame } from "./frame.ts"
import { updateFrames } from "./state.ts"

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

/**
 * Loop through all frames in the queue. We queue them because otherwise
 * x-link with a goto in the event listener will push two separate states to the history
 * and we don't want that.
 * @param pushToHistory to push the frame changes to history or not
 * @param clearQueue to clear the queue after or not
 * @param frameQueue the queue itself
 */
export function runFrameQueue(
	pushToHistory: boolean,
	clearQueue: boolean,
	frameQueue: Map<string, FrameQueueEntry>,
) {
	if (frameQueue.size > 0) {
		frameQueue.forEach((v, k) => {
			const frame = getFrame(k)
			// don't do anything if the frame is the same (can happen if we don't clear the queue)
			if (v.passage === frame.passage) return

			// update the API frame object
			frame.passage = v.passage

			// update the render frame object
			_frames[k] = {
				passage: v.passage,
				transition: v.doTransition,
			}
		})

		// only play if we tell it to
		if (pushToHistory) play(frameQueue)

		// update the $s._frames object for all of them
		// unless the frame doesn't participate in state!
		allFrames().forEach((f) => {
			if (f.state && f.passage) $s._frames[f.name] = f.passage
		})

		// EXPLANATION
		// we need to do the above because rendering frames can trigger more frames to initialize
		// so we can't queue them all neatly. for now
		// TODO: figure out if we CAN queue them neatly

		// then attempt to save the frames to localstorage
		updateFrames(frameQueue)

		if (clearQueue) frameQueue.clear()
	}
}
