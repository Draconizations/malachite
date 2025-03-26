/* This is the part of Malachite that is exposed to the end user
  All public APIs are declared here.

  Since this will interface with plain javascript, we should thoroughly check types!
*/

import Alpine, { type MAlpine } from "./alpine.ts"
import Config from "./config.ts"
import { play, version } from "./engine.ts"
import { current, active, goto } from "./frame.ts"
import markup from "./markup/index.ts"
import Passage from "./passage.ts"
import { SaveType, type emptyData } from "./state.ts"
import { filter, find, get, has, ifID, storyTitle, start } from "./story.ts"

export default function() {
  window.Engine = engineAPI
  window.Story = storyAPI
  window.State = stateAPI
  window.Frame = frameAPI
  window.Config = configAPI

  window.Alpine = alpineAPI
}

declare global {
	interface Window {
		Engine: typeof engineAPI
    Story: typeof storyAPI
    Alpine: typeof alpineAPI
    State: typeof stateAPI
    Frame: typeof frameAPI
    Config: typeof configAPI
		$s: typeof emptyData & Record<string, any>
	}
}

const alpineAPI: MAlpine = Alpine

const engineAPI = {
	version,
	play: () => {
		play()
	},
	render: (source: string | Passage) => {
		if (source instanceof Passage) {
			return markup(source.source)
		}
		if (typeof source !== "string")
			throw new TypeError("Engine.render: parameter 'source' must be a string or an instance of Passage.")
		return ""
	},
}

const storyAPI = {
  get id() {
    return ifID
  },
  title: storyTitle,

  get start() { 
    return Object.freeze(start) as Passage|undefined
  },

  // gets a single passage by name
  get: (name: string): Passage|undefined => {
    if (typeof name !== "string") throw new TypeError("Story.getz: parameter 'name' must be a string")
    return get(name)
  },
  // checks if the story has a passage with this name
  has: (name: string): boolean => {
    if (typeof name !== "string") throw new TypeError("Story.has: parameter 'name' must be a string")
    return has(name)
  },
  // finds all passages that match a predicate
  filter: (predicate: (passage: Passage) => boolean): Passage[] => {
    if (typeof predicate !== "function") throw new TypeError("Story.filter: parameter 'predicate' must be a function")
    return filter(predicate)
  },
  // gets the first passage that matches a predicate
  find: (predicate: (passage: Passage) => boolean): Passage | undefined => {
    if (typeof predicate !== "function") throw new TypeError("Story.find: parameter 'predicate' must be a function")
    return find(predicate)
  }
}

// TODO: everything lol
const stateAPI = {
  SaveType: Object.freeze(SaveType)
}

const frameAPI = {
  /**
   * Jumps to the specified passage. Uses the unnamed frame by default.
   * @param passage  The passage to jump to
   * @param frame (optional) the frame to use
   * @param skip (optional) whether to skip saving state to history or not
   */
  goto: (passage: string|Passage, frame = "_", skip = false) => {
    let name: string
    if (passage instanceof Passage) name = passage.name
    else name = passage

    if (typeof name !== "string") throw TypeError("Frame.goto: parameter 'passage' must be a string or an instance of Passage.")

    const target = frame ?? "_"

    goto(target, name, skip)
  },
  /**
   * Gets the currently active Passage in the specified frame
   * @param frame 
   * @returns 
   */
  current: (frame?: string): Passage|undefined => {
    return current(frame)
  },
  /**
   * Gets an array of all currently active passages (regardless of whether they're visible or not)
   * @returns 
   */
  active: (): (Passage|undefined)[] => {
    return active()
  }
}

const configAPI = {
  State: {
    get allowSave(): (type: number, frame?: string, passage?: Passage) => boolean {
      return Config.allowSave
    },
    set allowSave(value) {
      Config.allowSave = value
    }
  },
  Story: {
    get interface(): ((start: string) => string) | undefined {
      return Config.storyInterface
    },
    set interface(value) {
      Config.storyInterface = value
    }
  }
}