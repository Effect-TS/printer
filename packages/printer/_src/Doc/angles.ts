/**
 * Encloses the input document in angle brackets (`<>`).
 *
 * @tsplus fluent ets/printer/Doc angles
 */
export function angles<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.langle, Doc.rangle);
}
