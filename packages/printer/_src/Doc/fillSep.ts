/**
 * The `fillSep` combinator concatenates all documents in a collection
 * horizontally by placing a `space` between each pair of documents as long as
 * they fit the page. Once the page width is exceeded, a `line` is inserted and
 * the process is repeated for all documents in the collection.
 *
 * **Note**: the use of `line` means that if `group`ed, the documents will be
 * separated with a `space` instead of newlines. See `fillCat` if you do not
 * want a `space`.
 *
 * @tsplus static ets/printer/Doc/Ops fillSep
 */
export function fillSep<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.concatWith(docs, (a, b) => a.appendWithSoftLine(b));
}
