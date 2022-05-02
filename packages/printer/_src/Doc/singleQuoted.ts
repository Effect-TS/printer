/**
 * Encloses the input document in single quotes (`''`).
 *
 * @tsplus fluent ets/printer/Doc singleQuoted
 */
export function singleQuoted<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.squote, Doc.squote);
}
