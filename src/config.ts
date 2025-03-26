import type Passage from "passage"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class Config {
  // STATE & SAVES
  static allowSave: (saveType: number, frame?: string, passage?: Passage) => boolean = () => { return true }
  
  // USER INTERFACE
  static storyInterface: ((start: string) => string)|undefined

  static frameClass = "frame"
}