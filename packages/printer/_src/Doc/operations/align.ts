/**
 * The `align` combinator lays out a document with the nesting level set to the
 * current column.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * // As an example, the documents below will be placed one above the other
 * // regardless of the current nesting level
 *
 * // Without `align`ment, the second line is simply placed below everything
 * // that has been laid out so far
 * const unaligned = D.hsep([
 *   D.text('lorem'),
 *   D.vsep([D.text('ipsum'), D.text('dolor')])
 * ])
 *
 * console.log(R.renderPrettyDefault(unaligned))
 * // lorem ipsum
 * // dolor
 *
 * // With `align`ment, the `vsep`ed documents all start at the same column
 * const aligned = D.hsep([
 *   D.text('lorem'),
 *   D.align(D.vsep([D.text('ipsum'), D.text('dolor')]))
 * ])
 *
 * console.log(R.renderPrettyDefault(aligned))
 * // lorem ipsum
 * //       dolor
 * ```
 *
 * @tsplus getter effect/printer/Doc align
 */
export function align<A>(self: Doc<A>): Doc<A> {
  return Doc.column((position) => Doc.nesting((level) => Doc.nest(self, position - level)))
}
