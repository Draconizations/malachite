import { GlobalRegistrator } from "@happy-dom/global-registrator"
import pkg from "../package.json" with { type: "json " }

GlobalRegistrator.register()

declare global {
	interface Window {
		__VERSION__: string
	}
}

window.__VERSION__ = pkg.version
