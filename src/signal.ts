let subscriber: Function | null = null

export function signal(value?: any) {
  const subscriptions = new Set<Function>()

  return {
    get value() {
      if (subscriber) {
        subscriptions.add(subscriber)
        subscriber = null
      }
      return value
    },
    set value(updated: any) {
      value = updated
      subscriptions.forEach((fn) => fn())
    },
    get isSignal() {
      return true
    },
    unsubscribe(fn: Function) {
      return subscriptions.delete(fn)
    },
  }
}

export function effect(fn: Function) {
  subscriber = fn
  fn()
}

export function derived(fn: Function) {
  const derived = signal()
  effect(() => {
    derived.value = fn()
  })
  return derived
}
