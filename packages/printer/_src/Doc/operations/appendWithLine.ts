/**
 * The `appendWithLine` combinator concatenates two documents by placing a
 * `line` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a
 * // b
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects appendWithLine
 * @tsplus pipeable effect/printer/Doc appendWithLine
 */
export function appendWithLine<A>(that: Doc<A>) {
  return (self: Doc<A>): Doc<A> => Doc.cat(self, Doc.cat(Doc.line, that))
}
