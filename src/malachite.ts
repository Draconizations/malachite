// utility functions and whatnot

import { derived, effect, signal } from "./signal.ts"

export default class Malachite {
  static signal = (value?: any) => signal(value)
  static effect = (fn: Function) => effect(fn)
  static derived = (fn: Function) => derived(fn)
}
