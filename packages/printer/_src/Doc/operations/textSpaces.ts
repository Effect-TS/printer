/**
 * Constructs a string containing `n` space characters.
 *
 * @tsplus static effect/printer/Doc.Ops textSpaces
 */
export function textSpaces(n: number): string {
  let s = ""
  for (let i = 0; i < n; i++) {
    s = s += " "
  }
  return s
}
