/**
 * Encloses the input document in braces (`{}`).
 *
 * @tsplus static effect/printer/Doc.Ops braced
 * @tsplus getter effect/printer/Doc braced
 */
export function braced<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lbrace, Doc.rbrace)
}
