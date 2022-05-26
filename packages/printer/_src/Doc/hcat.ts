/**
 * The `hcat` combinator concatenates all documents in a collection horizontally
 * without any spacing.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat(D.words('lorem ipsum dolor'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // loremipsumdolor
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops hcat
 */
export function hcat<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.concatWith(docs, Doc.cat)
}
