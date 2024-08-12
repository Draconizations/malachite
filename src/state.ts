const handler = {
  get: (target: Record<string, any>, key: string) => {
    if (key === "isProxy") return true

    if (typeof target[key] === "undefined") return

    if (target[key].isSignal) return target[key].value

    if (!target[key].isProxy && typeof target[key] === "object")
      target[key] = new Proxy(target[key], handler)

    return target[key]
  },
  set: (target: Record<string, any>, key: string, value: any) => {
    if (target[key]?.isSignal) {
      target[key].value = value
      return true
    }

    target[key] = value
    // TODO: make the engine handle pushing history here

    return true
  },
  ownKeys(target: Record<string, any>) {
    return Object.keys(target)
  },
  has(target: Record<string, any>, prop: string) {
    return prop in target
  },
  deleteProperty(target: Record<string, any>, key: string) {
    let result = false
    if (key in target) {
      result = Reflect.deleteProperty(target, key)
    }
    return result
  },
}

export default class State {
  #store = new Proxy<Record<string, any>>({}, handler)
  get store() {
    return this.#store
  }
}

/**
 * Gets the value at the given path
 */
export function getPath(path: string) {
  if (!isValidPath(path)) {
    console.warn(`Invalid variable path ${path}`)
    return
  }

  const arr = path.split(".")
  let previous: any = window.State.store

  for (let i = 0; i < arr.length; i++) {
    previous = previous[arr[i]]
    if (typeof previous === "undefined") break
  }

  return previous
}

/**
 * Recursively sets a value in the store at the given path
 */
export function setPath(path: string, value: any) {
  if (!isValidPath(path)) {
    console.warn(`Invalid variable path ${path}`)
    return true
  }

  const arr = path.split(".")
  let previous = window.State.store
  let fail = false

  for (let i = 0; i < arr.length - 1; i++) {
    if (typeof previous[arr[i]] === "undefined") previous[arr[i]] = {}
    if (typeof previous[arr[i]] !== "object") {
      // can't set a new property here!
      fail = true
      console.warn(`Failed to set ${path}: ${arr.slice(0, i + 1).join(".")} is not an object.`)
      break
    }
    previous = previous[arr[i]]
  }

  if (!fail) previous[arr[arr.length - 1]] = value

  return true
}

function isValidPath(path: string) {
  const arr = path.split(".")
  try {
    arr.forEach((a) => new Function(`var ${a}`))
  } catch (e) {
    console.error(e)
    return false
  }
  return true
}
