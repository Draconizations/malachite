export interface Condition {
  statement: "if" | "else" | "elif"
  fn: Function
  body: string
}

export default class Conditional {
  source = ""
  conditions: Condition[] = []

  render(source: string) {}
}
