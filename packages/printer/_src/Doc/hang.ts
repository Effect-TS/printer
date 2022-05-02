/**
 * The `hang` combinator lays out a document with the nesting level set to
 * the *current column* plus the specified `indent`. Negative values for
 * `indent` are allowed and decrease the nesting level accordingly.
 *
 * This differs from the `nest` combinator, which is based on the *current
 * nesting level* plus the specified `indent`. When you're not sure, try the
 * more efficient combinator (`nest`) first.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.hang_(D.reflow('Indenting these words with hang'), 4)
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(24)))
 * // prefix Indenting these
 * //            words with
 * //            hang
 * ```
 *
 * @tsplus fluent ets/printer/Doc hang
 */
export function hang_<A>(self: Doc<A>, indent: number): Doc<A> {
  return Doc.nest(self, indent).align();
}

/**
 * The `hang` combinator lays out a document with the nesting level set to
 * the *current column* plus the specified `indent`. Negative values for
 * `indent` are allowed and decrease the nesting level accordingly.
 *
 * This differs from the `nest` combinator, which is based on the *current
 * nesting level* plus the specified `indent`. When you're not sure, try the
 * more efficient combinator (`nest`) first.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.hang_(D.reflow('Indenting these words with hang'), 4)
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(24)))
 * // prefix Indenting these
 * //            words with
 * //            hang
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects hang
 */
export const hang = Pipeable(hang_);
