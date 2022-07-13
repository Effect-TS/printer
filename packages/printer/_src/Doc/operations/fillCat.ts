/**
 * The `fillCat` combinator concatenates all documents in a collection
 * horizontally by placing a `empty` between each pair of documents as long as
 * they fit the page. Once the page width is exceeded, a `lineBreak` is inserted
 * and the process is repeated for all documents in the collection.
 *
 * **Note**: the use of `lineBreak` means that if `group`ed, the documents will
 * be separated with `empty` instead of newlines. See `fillSep` if you want a
 * `space` instead.
 *
 * @tsplus static effect/printer/Doc.Ops fillCat
 */
export function fillCat<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.concatWith(docs, (a, b) => a.appendWithSoftLineBreak(b))
}