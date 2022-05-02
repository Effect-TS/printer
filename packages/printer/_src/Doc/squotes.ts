/**
 * Encloses the input document in single quotes (`''`).
 *
 * @tsplus static ets/printer/Doc squotes
 */
export function squotes<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.squote, Doc.squote);
}
