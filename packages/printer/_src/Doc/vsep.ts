/**
 * The `vsep` combinator concatenates all documents in a collection vertically.
 * If a `group` undoes the line breaks inserted by `vsep`, the documents are
 * separated with a space instead.
 *
 * When a `vsep` is `group`ed, the documents are separated with a `space` if the
 * layoutfits the page, otherwise nothing is done. See the `sep` convenience
 * function for this use case.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const unaligned = D.hsep([
 *   D.text('prefix'),
 *   D.vsep(D.words('text to lay out'))
 * ])
 *
 * console.log(R.renderPrettyDefault(unaligned))
 * // prefix text
 * // to
 * // lay
 * // out
 *
 * // The `align` function can be used to align the documents under their first element
 * const aligned = D.hsep([
 *   D.text('prefix'),
 *   D.align(D.vsep(D.words('text to lay out')))
 * ])
 *
 * console.log(R.renderPrettyDefault(aligned))
 * // prefix text
 * //        to
 * //        lay
 * //        out
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops vsep
 */
export function vsep<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.concatWith(docs, Doc.appendWithLine)
}
