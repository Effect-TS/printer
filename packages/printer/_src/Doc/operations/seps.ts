/**
 * The `seps` combinator will attempt to lay out a collection of documents
 * separated by `space`s. If the output does not fit the page, then the
 * documents will be separated by newlines. This is what differentiates it from
 * `vsep`, which always lays out documents beneath one another.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.seps(D.words('text to lay out'))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // prefix text to lay out
 *
 * // If the page width is too narrow, documents are separated by newlines
 * console.log(pipe(doc, R.renderPretty(20)))
 * // prefix text
 * // to
 * // lay
 * // out
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops seps
 */
export function seps<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.vsep(docs).group
}
