import Engine from "./engine.ts"
import Story from "./story.ts"
import State from "./state.ts"
import Alpine from "./alpine.ts"
import setupGlobals from "./api.ts"

;(async () => {
	setupGlobals()

	Engine.init()
	Story.init()

	// TODO: load userscripts here

	State.init()
	Alpine.start()

	// TODO: load any potential startup passages here?

	Engine.start()
})()
