/**
 * The `appendWithLineBreak` combinator concatenates two documents by placing a
 * `lineBreak` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithLineBreak_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a
 * // b
 *
 * console.log(R.renderPrettyDefault(D.group(doc)))
 * // ab
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects appendWithLineBreak
 * @tsplus pipeable effect/printer/Doc appendWithLineBreak
 */
export function appendWithLineBreak<A>(that: Doc<A>) {
  return (self: Doc<A>): Doc<A> => Doc.cat(self, Doc.cat(Doc.lineBreak, that))
}
