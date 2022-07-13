/**
 * The `enclose` combinator encloses a document `x` in between `left` and
 * `right` documents.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = pipe(D.char('-'), D.enclose(D.char('A'), D.char('Z')))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // A-Z
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects surround
 * @tsplus pipeable effect/printer/Doc surround
 */
export function surround<B, C>(left: Doc<B>, right: Doc<C>) {
  return <A>(self: Doc<A>): Doc<A | B | C> => Doc.cat(left, Doc.cat(self, right))
}
