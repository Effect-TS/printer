/**
 * The `punctuate` combinator appends the `punctuator` document to all but the
 * last document in a collection of documents. The separators are places after
 * the document entries, which can be observed if the result is oriented
 * vertically.
 *
 * ```typescript
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const docs = D.punctuate_(D.words("lorem ipsum dolor sit amet"), D.comma)
 *
 * console.log(R.renderPrettyDefault(D.hsep(docs)))
 * // lorem, ipsum, dolor, sit, amet
 *
 * // The separators are put at the end of the entries, which can be better
 * // visualzied if the documents are rendered vertically
 * console.log(R.renderPrettyDefault(D.vsep(docs)))
 * // lorem,
 * // ipsum,
 * // dolor,
 * // sit,
 * // amet
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops punctuate
 */
export function punctuate<A, B>(
  docs: Collection<Doc<B>>,
  punctuator: Doc<A>
): Chunk<Doc<A | B>> {
  const docs0 = Chunk.from(docs)
  return docs0.mapWithIndex((i, x) => docs0.length - 1 === i ? x : Doc.cat(x, punctuator))
}
