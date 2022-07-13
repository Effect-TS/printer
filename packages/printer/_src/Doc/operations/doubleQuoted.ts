/**
 * Encloses the input document in double quotes (`""`).
 *
 * @tsplus static effect/printer/Doc.Ops doubleQuoted
 * @tsplus getter effect/printer/Doc doubleQuoted
 */
export function doubleQuoted<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.dquote, Doc.dquote)
}
