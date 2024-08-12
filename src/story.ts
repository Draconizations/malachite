import Markup from "./markup.ts"
import Passage from "./passage.ts"
import Snippet from "./snippet.ts"

/**
 * The story. Stores a list of all passages, snippets and handles these.
 */
export default class Story {
  #storydata: HTMLElement

  name: string = this.getStoryAttr("name") || "A Malachite Story"

  #ifid: string
  get ifid() {
    return this.#ifid
  }

  passages: Passage[] = []
  snippets: Snippet[] = []

  #startPassage: Passage
  get startPassage() {
    return this.#startPassage.name
  }

  constructor() {
    // init the story data, get the story name
    const dataEl = document.querySelector("tw-storydata")
    if (!dataEl) throw Error("Story data element is missing!")
    this.#storydata = dataEl as HTMLElement
    // same for the ifid
    const ifid = this.getStoryAttr("ifid")
    if (!ifid) throw Error("Story data ifid field is missing!")
    this.#ifid = ifid

    // get all the passage elements and add them to the passage array
    this.#storydata?.querySelectorAll("tw-passagedata").forEach((p) => {
      const name = p.attributes.getNamedItem("name")?.value || "Passage"
      const tags = p.attributes.getNamedItem("tags")?.value.split(" ")
      const source = Markup.unescape(p.innerHTML)

      if (!tags || !tags?.includes("snippet")) {
        this.passages.push(new Passage(name, tags || [], source))
      } else {
        this.snippets.push(new Snippet(name, tags || [], source))
      }
    })

    // get the start passage
    this.#startPassage = this.#getStartPassage()
  }

  /**
   * Returns a story attribute's value by the given attribute name
   */
  getStoryAttr(attr: string) {
    return this.#storydata?.attributes.getNamedItem(attr)?.value || null
  }

  #getStartPassage() {
    // check if we at leats have a story data element. throw an error if not
    if (!this.#storydata) throw Error("No story data element found.")
    // get the passage id of the starting passage
    const startPassageId = Number.parseInt(
      this.#storydata?.attributes.getNamedItem("startnode")?.value || "nah"
    )
    // and throw an error if it doesn't return a valid id ("nah")
    if (Number.isNaN(startPassageId)) throw Error("No start passage ID found.")
    // get the starting passage name
    const startPassageName =
      document.querySelector(`[pid="${startPassageId}"]`)?.attributes.getNamedItem("name")?.value ||
      null

    // get the starting passage
    let startPassage: Passage
    try {
      startPassage = this.passage(startPassageName || "")
    } catch (e) {
      throw Error("Starting passage does not exist!")
    }

    return startPassage
  }

  /**
   * Finds all passages with a certain tag.
   */
  passagesByTag(tag: string) {
    return this.passages.filter((p) => p.tags.includes(tag))
  }

  /**
   * Gets a snippet by its name Throws an error if it cannot find a snippet with the given name.
   */
  snippet(name: string) {
    const snippet = this.snippets.find((p) => {
      return p.name.split(" ").join("-").toLowerCase() === name.trim()
    })
    if (!snippet) throw new Error(`No snippet with name "${name}" found.`)
    return snippet
  }

  /**
   * Gets a regular passage by its name. Throws an error if it cannot find a passage with the given name.
   */
  passage(name: string) {
    const passage = this.passages.find((p) => {
      return p.name === name.trim()
    })
    if (!passage) throw new Error(`No passage with name "${name}" found.`)
    return passage
  }
}
