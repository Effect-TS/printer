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
 * @tsplus fluent ets/printer/Doc appendWithSoftLineBreak
 * @tsplus static ets/printer/Doc/Ops appendWithSoftLineBreak
 */
export function appendWithSoftLineBreak_<A>(self: Doc<A>, that: Doc<A>): Doc<A> {
  return Doc.cat(self, Doc.cat(Doc.softLineBreak, that))
}

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
 * @tsplus static ets/printer/Doc/Aspects appendWithSoftLineBreak
 */
export const appendWithSoftLineBreak = Pipeable(appendWithSoftLineBreak_)
