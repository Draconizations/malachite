export default function Frame() {
	return {
		goto(frame: string, passage: string, skip = false) {
			window.Engine.frameQueue.set(frame, passage)

			window.Alpine.nextTick(() => {
				if (window.Engine.frameQueue.size > 0) {
					window.Engine.frameQueue.forEach((v, k) => {
						;(window.Alpine.store("story") as any)._frames[k] = v
					})
					window.Engine.frameQueue.clear()

					if (!skip) {
						window.Engine.play()
					}
				}
			})
		},
	}
}
