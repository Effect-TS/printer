/**
 * Splits a string of words into individual `Text` documents using the
 * specified `char` to split on (defaults to `' '`).
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.tupled(D.words('lorem ipsum dolor'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // (lorem, ipsum, dolor)
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops words
 */
export function words(s: string, char = " "): Chunk<Doc<never>> {
  return Chunk.from(s.split(char)).map(Doc.string)
}
