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
 * @tsplus fluent ets/printer/Doc appendWithLineBreak
 * @tsplus static ets/printer/Doc/Ops appendWithLineBreak
 */
export function appendWithLineBreak_<A>(self: Doc<A>, that: Doc<A>): Doc<A> {
  return Doc.cat(self, Doc.cat(Doc.lineBreak, that))
}

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
 * @tsplus static ets/printer/Doc/Aspects appendWithLineBreak
 */
export const appendWithLineBreak = Pipeable(appendWithLineBreak_)
