/**
 * Encloses the input document in brackets (`[]`).
 *
 * @tsplus static effect/printer/Doc.Ops bracketed
 * @tsplus getter effect/printer/Doc bracketed
 */
export function bracketed<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lbracket, Doc.rbracket)
}
