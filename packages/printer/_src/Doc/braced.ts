/**
 * Encloses the input document in braces (`{}`).
 *
 * @tsplus fluent ets/printer/Doc braced
 */
export function braced<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lbrace, Doc.rbrace);
}
