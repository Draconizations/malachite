export default function Frame() {
	return {
		goto(frame: string, passage: string, skip = false) {
			window.Engine.frameQueue.set(frame, passage)

			window.Alpine.nextTick(() => {
				;(window.Alpine.store("story") as any).frames[frame] = passage
				window.Engine.frameQueue.delete(frame)

				if (!skip && window.Engine.frameQueue.values.length === 0) {
					window.Engine.play()
				}
			})
		},
	}
}
