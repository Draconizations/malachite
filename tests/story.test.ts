import { afterEach, beforeEach, describe, expect, test } from "vitest"
import Passage from "../src/passage.ts"
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
	storyData.setAttribute("startnode", "14")

	startPassage = createPassage("My Epic Story")
	startPassage.setAttribute("pid", "14")
	storyData.append(startPassage)

	document.body.prepend(storyData)
})

afterEach(() => {
	Story.finish()
})

function createPassage(name: string, tags = "", body?: string) {
	const passage = document.createElement("tw-passagedata")
	passage.setAttribute("name", name)
	passage.setAttribute("tags", tags)
	passage.append(body || `Test Passage ${name}`)
	return passage
}

describe("StoryData", () => {
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

	test("Throw on missing start node", () => {
		storyData.removeAttribute("startnode")

		expect(() => Story.init()).toThrow(/start/i)
	})

	test("Get correct start node ", () => {
		storyData.append(createPassage("Hello World", "test hello", "Hello World!!"))
		storyData.append(createPassage("Goodbye World", "", "Goodbye World."))

		expect(() => Story.init()).not.toThrow()
		expect(Story.start).not.toBeUndefined()
		expect(Story.start).toBeInstanceOf(Passage)
		expect(Story.start?.name).toBe("My Epic Story")
	})

	test("Throw on non-existent start node", () => {
		storyData.setAttribute("startnode", "22")
		expect(() => Story.init()).toThrow(/start/i)
	})
})

describe("Accessing Passages", () => {
	beforeEach(() => {
		storyData.append(createPassage("Hello World", "test hello", "Hello World!!"))
		storyData.append(createPassage("Goodbye World", "", "Goodbye World."))

		Story.init()
	})

	test("Get passage by name", () => {
		const p = Story.get("Hello World")
		expect(p).toBeInstanceOf(Passage)
		expect(p?.name).toBe("Hello World")
		expect(p?.source).toBe("Hello World!!")
		expect(p?.tags).toHaveLength(2)
	})

	test("Get non-existent passage by name", () => {
		const p = Story.get("Nope")
		expect(p).toBeUndefined()
	})

	test("Find passage by predicate (tags)", () => {
		const p = Story.find((passage) => passage.tags.includes("hello"))

		expect(p).toBeInstanceOf(Passage)
		expect(p?.name).toBe("Hello World")
		expect(p?.source).toBe("Hello World!!")
		expect(p?.tags).toHaveLength(2)
	})

	test("Find passage by predicate (source/regex)", () => {
		const p = Story.find((passage) => /Hello/i.test(passage.source))

		expect(p).toBeInstanceOf(Passage)
		expect(p?.name).toBe("Hello World")
		expect(p?.source).toBe("Hello World!!")
		expect(p?.tags).toHaveLength(2)
	})

	test("Find non-existent passage by predicate (name)", () => {
		const p = Story.find((passage) => passage.name.includes("You Lost The Game"))
		expect(p).toBeUndefined()
	})

	test("Check if passage exists", () => {
		const exists = Story.has("Goodbye World")
		expect(exists).toBe(true)
	})

	test("Check if non-existent passage exists", () => {
		const exists = Story.has("Huh")
		expect(exists).toBe(false)
	})

	test("Find all passages by name/regex", () => {
		const p = Story.filter((passage) => /World/i.test(passage.name))
		expect(p).toHaveLength(2)
	})
})
