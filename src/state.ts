const handler = {
  get: (target: Record<string,any>, key: string) => {
    if (key === "isProxy") return true

    const prop = target[key]
    if (typeof prop === "undefined") return

    if (!prop.isProxy && typeof prop === "object") target[key] = new Proxy(prop, handler)

    return target[key]
  },
  set: (target: Record<string,any>, key: string, value: any) => {
    target[key] = value
    // TODO: make the engine handle pushing history here
    return true
  },
  ownKeys (target: Record<string,any>) {
    return Object.keys(target);
  },
  has (target: Record<string,any>, prop: string) {
    return prop in target;
  },
  deleteProperty (target: Record<string,any>, key: string) {
    let result = false;
    if (key in target) {
      // Delete via Reflection.
      result = Reflect.deleteProperty(target, key);
    }
    return result;
  }
}

export default class State {
  #store = new Proxy<Record<string,any>>({}, handler)
  get store() {
    return this.#store
  }
}