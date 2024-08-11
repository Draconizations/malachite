const handler = {
  get: (target: Record<string,any>, key: string) => {
    if (key === "isProxy") return true

    if (typeof target[key] === "undefined") return

    if (target[key].isSignal) return target[key].value

    if (!target[key].isProxy && typeof target[key] === "object")
      target[key] = new Proxy(target[key], handler)

    return target[key]
  },
  set: (target: Record<string,any>, key: string, value: any) => {
    if (target[key] && target[key].isSignal) {
      target[key].value = value
      return true
    }

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