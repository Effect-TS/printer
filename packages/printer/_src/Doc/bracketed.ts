/**
 * Encloses the input document in brackets (`[]`).
 *
 * @tsplus fluent ets/printer/Doc bracketed
 */
export function bracketed<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lbracket, Doc.rbracket)
}
