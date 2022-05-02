/**
 * Encloses the input document in double quotes (`""`).
 *
 * @tsplus fluent ets/printer/Doc doubleQuoted
 */
export function doubleQuoted<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.dquote, Doc.dquote);
}
