import Malachite from "./malachite.ts";

window.Malachite = new Malachite()

window.Malachite.start()

declare global {
  interface Window {
    Malachite: Malachite
  }
}