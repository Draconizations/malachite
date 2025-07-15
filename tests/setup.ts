import { afterAll, beforeAll } from "bun:test"
import { GlobalRegistrator } from "@happy-dom/global-registrator"

function createPassage(name: string, tags = "", body?: string) {
	const passage = document.createElement("tw-passagedata")
	passage.setAttribute("name", name)
	passage.setAttribute("tags", tags)
	passage.append(body || `Test Passage ${name}`)
	return passage
}

GlobalRegistrator.register()

beforeAll(() => {
	document.head.innerHTML = ""
	document.body.innerHTML = ""

	document.head.innerHTML = `
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charset="utf-8" />
  <title>Malachite Tests</title>
  `

	document.body.innerHTML = `
  <div id="mala-viewport"></div>
  `

	const storyData = document.createElement("tw-storydata")
	storyData.setAttribute("name", "Malachite Test Story")
	storyData.setAttribute("ifid", "THIS-IS-NOT-A-VALID-UUID")
	storyData.setAttribute("startnode", "My Epic Story")

	const startPassage = createPassage("My Epic Story")
	storyData.append(startPassage)

	document.body.prepend(storyData)
})

afterAll(() => {
	// global teardown
})
