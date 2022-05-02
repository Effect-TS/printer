/**
 * The `encloseSep` combinator concatenates a collection of documents,
 * separating each document in the collection using the specified `sep`
 * document. After concatenation, the resulting document is enclosed by the
 * specified `left` and `right` documents.
 *
 * To place the `sep` document at the end of each entry, see the `punctuate`
 * combinator.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as A from '@effect-ts/core/Array'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text("list"),
 *   D.align(
 *     pipe(
 *       A.map_(["1", "20", "300", "4000"], (n) =>
 *         n.length === 1 ? D.char(n) : D.text(n)
 *       ),
 *       D.encloseSep(D.lbracket, D.rbracket, D.comma)
 *     )
 *   )
 * ])
 *
 * // The documents are laid out horizontally if that fits the page:
 * console.log(R.renderPrettyDefault(doc))
 * // list [1,20,300,4000]
 *
 * // Otherwise they are laid out vertically, with separators put in the front:
 * console.log(pipe(doc, R.renderPretty(10)))
 * // list [1
 * //      ,20
 * //      ,300
 * //      ,4000]
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops encloseSep
 */
export function encloseSep<A, B, C, D>(
  docs: Collection<Doc<D>>,
  left: Doc<A>,
  right: Doc<B>,
  sep: Doc<C>
): Doc<A | B | C | D> {
  const docs0 = Chunk.from(docs);
  if (docs0.length === 0) return Doc.cat(left, right);
  if (docs0.length === 1) return Doc.cat(left, Doc.cat(docs0.unsafeGet(0)!, right));
  // TODO(Max): remove any once unification is fixed
  const xs = Chunk.fill(docs0.length - 1, () => sep).prepend(left).zipWith(
    docs0,
    Doc.cat as any
  );
  return Doc.cat(Doc.cats(xs as any), right);
}
