/**
 * The `appendWithSpace` combinator concatenates two documents by placing a
 * `space` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSpace_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects appendWithSpace
 * @tsplus pipeable effect/printer/Doc appendWithSpace
 */
export function appendWithSpace<A>(that: Doc<A>) {
  return (self: Doc<A>): Doc<A> => Doc.cat(self, Doc.cat(Doc.space, that))
}
