export default class Config {
  // STATE & SAVES
  static allowSave: (saveType: number) => boolean = () => { return true }
  
  // USER INTERFACE
  static storyInterface: ((start: string) => string)|undefined
}