/**
 * Encloses the input document in single quotes (`''`).
 *
 * @tsplus static effect/printer/Doc.Ops singleQuoted
 * @tsplus getter effect/printer/Doc singleQuoted
 */
export function singleQuoted<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.squote, Doc.squote)
}
