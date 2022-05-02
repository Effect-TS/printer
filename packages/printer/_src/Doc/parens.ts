/**
 * Encloses the input document in parentheses (`()`).
 *
 * @tsplus fluent ets/printer/Doc parens
 */
export function parens<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lparen, Doc.rparen);
}
