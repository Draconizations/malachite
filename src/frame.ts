import { frameQueue } from "./engine.ts"
import { get } from "./story.ts"
import { runFrameQueue } from "./utils.ts"

export interface FrameConfig {
	state?: boolean
}

export const _frames: Frame[] = []

/**
 * Frame object. Can be configured from userscripts.
 */
export default class Frame {
	name: string
	state: boolean
	#passage: string | undefined

	get passage() {
		return this.#passage
	}
	set passage(value: string | undefined) {
		this.#passage = value
	}

	constructor(name: string, config?: FrameConfig) {
		this.name = name
		this.state = config?.state ?? true
	}

	// TODO: test this
	visible() {
		const els = Array.from(document.getElementsByTagName("*"))
		for (const e of els) {
			for (const a of Array.from(e.attributes)) {
				if (a.name.startsWith(`x-frame:${this.name}`)) return true
			}
		}
		return false
	}
}

/**
 * Creates a new Frame instance and pushes it to the frame array
 * @param name
 * @param config
 * @returns
 */
export function newFrame(name?: string, config?: FrameConfig): Frame {
	const n = name ?? "_"
	const f = new Frame(n.toLowerCase(), config)
	_frames.push(f)
	return f
}

/**
 * Gets a frame by its name. Creates a new frame if this frame isn't found.
 * @param name
 * @returns
 */
export function getFrame(name?: string): Frame {
	const n = name ?? "_"
	const frame = _frames.find((f) => f.name === n.toLowerCase())
	if (!frame) return newFrame(name)
	return frame
}

/**
 * Gets all frames that match a certain predicate
 * @param predicate
 * @returns
 */
export function filterFrames(predicate: (f: Frame) => boolean): Frame[] {
	return _frames.filter(predicate)
}

/**
 * Gets every single frame
 * @returns
 */
export function allFrames() {
	return _frames
}

/**
 * Swaps the specified frame to the given passage.
 * @param passageName name of the passage to swap to
 * @param frameName name of the frame to swap
 * @param transition whether to apply the transition class or not
 * @param skip whether to skip pushing to the history or not
 */
export function goto(passageName: string, frameName = "_", transition = true, skip = false) {
	const passage = get(passageName)
	if (!passage) throw Error(`Frame.goto: Passage with name "${passageName}" not found.`)

	const frame = getFrame(frameName)

	frameQueue.set(frame.name, {
		passage: passage.name,
		pushToState: true, // we do want to push these to the state
		doTransition: transition, // play transition unless otherwise specified
	})

	window.Alpine.nextTick(() => {
		// same as x-link, really
		runFrameQueue(!skip, true, frameQueue)
	})
}

/**
 * Returns the current passage in the given frame
 * @param frame
 * @returns
 */
export function current(frame = "_") {
	const name = (window.Alpine.store("story") as any)._frames[frame]
	if (!name) return
	return get(name)
}

/**
 * Returns the current passages from all frames (whether visible or not)
 * @returns
 */
export function active() {
	const names = Object.values((window.Alpine.store("story") as any)._frames) as string[]
	return names.map((n) => get(n))
}
