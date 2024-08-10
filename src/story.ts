import Markup from "./markup.ts"
import Passage from "./passage.ts"

export default class Story {
  #storydata: HTMLElement

  name: string = this.getAttr("name") || "A Malachite Story"
  
  #ifid: string
  get ifid() {
    return this.#ifid
  }

  passages: Passage[] = []
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
    const ifid = this.getAttr("ifid")
    if (!ifid) throw Error("Story data ifid field is missing!")
    this.#ifid = ifid

    // get all the passage elements and add them to the passage array
    this.#storydata?.querySelectorAll("tw-passagedata").forEach((p) => {
      let name = p.attributes.getNamedItem("name")?.value || "Passage"
      let tags = p.attributes.getNamedItem("tags")?.value
      let source = Markup.unescape(p.innerHTML)

      this.passages.push(new Passage(name, tags?.split(" ") || [], source))
    })

    // get the start passage
    this.#startPassage = this.#getStartPassage()
  }

  getAttr(attr: string) {
    return this.#storydata?.attributes.getNamedItem(attr)?.value || null
  }

  #getStartPassage() {
    // check if we at leats have a story data element. throw an error if not
    if (!this.#storydata) throw Error("No story data element found.")
      // get the passage id of the starting passage
      const startPassageId = parseInt(
        this.#storydata?.attributes.getNamedItem("startnode")?.value || "nah"
      )
      // and throw an error if it doesn't return a valid id ("nah")
      if (isNaN(startPassageId)) throw Error("No start passage ID found.")
      // get the starting passage name
      const startPassageName =
        document
          .querySelector(`[pid="${startPassageId}"]`)
          ?.attributes.getNamedItem("name")
          ?.value || null
      
      // get the starting passage
      let startPassage: Passage
      try {
        startPassage = this.passage(startPassageName)
      } catch (e) {
        throw Error("Starting passage does not exist!")
      }

      return startPassage
  }

  passage(name: string|null) {
    const passage = this.passages.find(p => p.name === name)
    if (!passage) throw new Error(`No passage with name "${name}" found.`)
    return passage
  }
}