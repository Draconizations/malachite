import { frameQueue, play } from "./engine.ts"
import { get } from "./story.ts"

export function goto(frame: string, name: string, skip: boolean) {
	const passage = get(name)
	if (!passage) throw Error(`Frame.goto: Passage with name "${name}" not found.`)

	frameQueue.set(frame, passage.name)

	window.Alpine.nextTick(() => {
		if (frameQueue.size > 0) {
			frameQueue.forEach((v, k) => {
				;(window.Alpine.store("story") as any)._frames[k] = v
			})
			frameQueue.clear()

			if (!skip) {
				play()
			}
		}
	})
}
