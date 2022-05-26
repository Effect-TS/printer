/**
 * The `vcat` combinator concatenates all documents in a collection vertically.
 * If the output is grouped then the line breaks are removed.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.vcat(D.words('lorem ipsum dolor'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem
 * // ipsum
 * // dolor
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops vcat
 */
export function vcat<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.concatWith(docs, Doc.appendWithLineBreak)
}
