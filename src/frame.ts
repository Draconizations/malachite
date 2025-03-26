import { frameQueue, play } from "./engine.ts"
import { get } from "./story.ts"
import { _frames as _aFrames } from "./alpine.ts"

export interface FrameConfig {
	history?: boolean
}

const _frames: Frame[] = []

export default class Frame {
	name: string
	history: boolean
	#passage: string|undefined

	get passage() {
		return this.#passage
	}
	set passage(value: string|undefined) {
		this.#passage = value
	}

	constructor(name: string, config?: FrameConfig) {
		this.name = name
		this.history = config?.history ?? true
	}

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

export function newFrame(name?: string, config?: FrameConfig): Frame {
	const n = name ?? "_"
	const f = new Frame(n.toLowerCase(), config)
	_frames.push(f)
	return f
}

export function getFrame(name?: string): Frame {
	const n = name ?? "_"
	const frame = _frames.find(f => f.name === n.toLowerCase())
	if (!frame) return newFrame(name)
	return frame
}

export function filterFrames(predicate: (f: Frame) => boolean): Frame[] {
	return _frames.filter(predicate)
}

export function allFrames() {
	return _frames
}

export function goto(passageName: string, frameName = "_", skip = false) {
	const passage = get(passageName)
	if (!passage) throw Error(`Frame.goto: Passage with name "${passageName}" not found.`)

	const frame = getFrame(frameName)

	frameQueue.set(frameName, passage.name)

	window.Alpine.nextTick(() => {
		if (frameQueue.size > 0) {
				frameQueue.forEach((v, k) => {
					_aFrames[frame.name] = v
					frame.passage = v
					if (frame.history) (Alpine.store("story") as any)._frames[k] = frame.passage
				})
			frameQueue.clear()

			if (!skip) {
				play(frameName, passage)
			}
		}
	})
}

export function current(frame = "_") {
	const name = (window.Alpine.store("story") as any)._frames[frame]
	if (!name) return
	return get(name)
}

export function active() {
	const names = Object.values((window.Alpine.store("story") as any)._frames) as string[]
	return names.map(n => get(n))
}