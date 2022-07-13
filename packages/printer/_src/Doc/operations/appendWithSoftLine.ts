/**
 * The `appendWithSoftLine` combinator concatenates two documents by placing a
 * `softLine` document between them.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSoftLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 *
 * console.log(pipe(doc, R.renderPretty(1)))
 * // a
 * // b
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects appendWithSoftLine
 * @tsplus pipeable effect/printer/Doc appendWithSoftLine
 */
export function appendWithSoftLine<A>(that: Doc<A>) {
  return (self: Doc<A>): Doc<A> => Doc.cat(self, Doc.cat(Doc.softLine, that))
}
