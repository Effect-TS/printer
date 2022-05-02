/**
 * Encloses the input document in parentheses (`()`).
 *
 * @tsplus fluent ets/printer/Doc parenthesized
 */
export function parenthesized<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lparen, Doc.rparen);
}
