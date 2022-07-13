/**
 * Encloses the input document in angle brackets (`<>`).
 *
 * @tsplus static effect/printer/Doc.Ops angled
 * @tsplus getter effect/printer/Doc angled
 */
export function angled<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.langle, Doc.rangle)
}
