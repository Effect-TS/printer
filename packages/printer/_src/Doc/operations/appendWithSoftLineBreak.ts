/**
 * The `appendWithSoftLineBreak` combinator concatenates two documents by
 * placing a `softLineBreak` document between them.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSoftLineBreak_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // ab
 *
 * console.log(pipe(doc, R.renderPretty(1)))
 * // a
 * // b
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects appendWithSoftLineBreak
 * @tsplus pipeable effect/printer/Doc appendWithSoftLineBreak
 */
export function appendWithSoftLineBreak<A>(that: Doc<A>) {
  return (self: Doc<A>): Doc<A> => Doc.cat(self, Doc.cat(Doc.softLineBreak, that))
}
