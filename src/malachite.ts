import Engine from "./engine.ts"
import Story from "./story.ts"
import State from "./state.ts"
import Alpine from "./alpine.ts"
import setupGlobals from "./api.ts"

;(async () => {
	setupGlobals()

	Engine.init()
	Story.init()

	Engine.runUserScripts()

	State.init()
	Alpine.start()
	window.$s = Alpine.store("story") as any

	// TODO: load any potential startup passages here?

	Engine.start()
})()
