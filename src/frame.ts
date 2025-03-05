import Alpine from "./alpine.ts"
import { frameQueue, play } from "./engine.ts"

export function goto(frame: string, passage: string, skip: boolean) {
	frameQueue.set(frame, passage)

	Alpine.nextTick(() => {
		if (frameQueue.size > 0) {
			frameQueue.forEach((v, k) => {
				;(Alpine.store("story") as any)._frames[k] = v
			})
			frameQueue.clear()

			if (!skip) {
				play()
			}
		}
	})
}
