/**
 * The `cats` combinator will attempt to lay out a collection of documents
 * separated by nothing. If the output does not fit the page, then the documents
 * will be separated by newlines. This is what differentiates it from `vcat`,
 * which always lays out documents beneath one another.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('Docs:'),
 *   D.cats(D.words('lorem ipsum dolor'))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // Docs: loremipsumdolor
 *
 * // If the document exceeds the width of the page, the documents are rendered
 * // one above another
 * console.log(pipe(doc, R.renderPretty(10)))
 * // Docs: lorem
 * // ipsum
 * // dolor
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops cats
 */
export function cats<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.vcat(docs).group
}
