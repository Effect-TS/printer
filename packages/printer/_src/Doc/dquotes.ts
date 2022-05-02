/**
 * Encloses the input document in double quotes (`""`).
 *
 * @tsplus fluent ets/printer/Doc dquotes
 */
export function dquotes<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.dquote, Doc.dquote);
}
