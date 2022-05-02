/**
 * Encloses the input document in braces (`{}`).
 *
 * @tsplus fluent ets/printer/Doc braces
 */
export function braces<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lbrace, Doc.rbrace);
}
