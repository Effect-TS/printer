/**
 * Encloses the input document in brackets (`[]`).
 *
 * @tsplus fluent ets/printer/Doc brackets
 */
export function brackets<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lbracket, Doc.rbracket);
}
