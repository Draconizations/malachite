import { describe, expect, test } from "bun:test"
import { afterEach, beforeEach } from "bun:test"
import * as Story from "../src/story.ts"

let storyData: HTMLElement
let startPassage: HTMLElement

beforeEach(() => {
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

	storyData = document.createElement("tw-storydata")
	storyData.setAttribute("name", "Malachite Test Story")
	storyData.setAttribute("ifid", "00000000-0000-4000-A000-000000000000")
	storyData.setAttribute("startnode", "My Epic Story")

	startPassage = createPassage("My Epic Story")
	storyData.append(startPassage)

	document.body.prepend(storyData)
})

afterEach(() => {
	// global teardown
})

function createPassage(name: string, tags = "", body?: string) {
	const passage = document.createElement("tw-passagedata")
	passage.setAttribute("name", name)
	passage.setAttribute("tags", tags)
	passage.append(body || `Test Passage ${name}`)
	return passage
}

describe("Malformed StoryData", () => {
	test("Throw on missing <tw-storydata>", () => {
		storyData.remove()
		expect(() => Story.init()).toThrow(/storydata/i)
	})

	test("Throw on missing name", () => {
		storyData.removeAttribute("name")
		expect(() => Story.init()).toThrow(/name/i)
	})

	test("Throw on missing IFID", () => {
		storyData.removeAttribute("ifid")
		expect(() => Story.init()).toThrow(/IFID/i)
	})

	test("Throw on invalid IFID", () => {
		storyData.setAttribute("ifid", "THIS-IS-NOT-A-VALID-UUID")
		expect(() => Story.init()).toThrow(/IFID/i)
	})

	test("Throw on duplicate passage name", () => {
		const hehe = createPassage("hehe")
		storyData.append(hehe, hehe.cloneNode())
		expect(() => Story.init()).toThrow(/duplicate/i)
	})
})
