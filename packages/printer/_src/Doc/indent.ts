/**
 * The `indent` combinator indents a document by the specified `indent`
 * beginning from the current cursor position.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat([
 *   D.text('prefix'),
 *   D.indent_(D.reflow('The indent function indents these words!'), 4)
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(24)))
 * // prefix    The indent
 * //           function
 * //           indents these
 * //           words!
 * ```
 *
 * @tsplus fluent ets/printer/Doc indent
 */
export function indent_<A>(self: Doc<A>, indent: number): Doc<A> {
  return Doc.cat(Doc.spaces(indent), self).hang(indent);
}

/**
 * The `indent` combinator indents a document by the specified `indent`
 * beginning from the current cursor position.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat([
 *   D.text('prefix'),
 *   D.indent_(D.reflow('The indent function indents these words!'), 4)
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(24)))
 * // prefix    The indent
 * //           function
 * //           indents these
 * //           words!
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects indent
 */
export const indent = Pipeable(indent_);
