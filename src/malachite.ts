import Engine from "./engine.ts"
import Story from "./story.ts"
import State from "./state.ts"
import Alpine from "./alpine.ts"
import setupGlobals from "./api.ts"
import { emptyData } from "./state.ts";

(async () => {
	setupGlobals()

	Engine.init()
	Story.init()

	Alpine.start()
	window.Alpine.store("story", emptyData)
	window.$s = { ...Alpine.store("story") as any } // create a shallow copy
	
	Engine.runUserScripts()
	State.init()

	// TODO: load any potential startup passages here?

	Engine.start()
})()
