/**
 * The `hsep` combinator concatenates all documents in a collection horizontally
 * by placing a `space` between each pair of documents.
 *
 * For automatic line breaks, consider using `fillSep`.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep(D.words('lorem ipsum dolor sit amet'))
 *
 * console.log(pipe(doc, R.renderPretty(80)))
 * // lorem ipsum dolor sit amet
 *
 * // The `hsep` combinator will not introduce line breaks on its own, even when
 * // the page is too narrow
 * console.log(pipe(doc, R.renderPretty(5)))
 * // lorem ipsum dolor sit amet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops hsep
 */
export function hsep<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.concatWith(docs, Doc.appendWithSpace);
}
