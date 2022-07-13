/**
 * The `spaces` combinator lays out a document containing `n` spaces. Negative
 * values for `n` count as `0` spaces.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.brackets(D.dquotes(D.spaces(5)))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // ["     "]
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops spaces
 */
export function spaces(n: number): Doc<never> {
  if (n <= 0) return Doc.empty
  if (n === 1) return Doc.char(" ")
  return Doc.text(Doc.textSpaces(n))
}
