/**
 * Encloses the input document in parentheses (`()`).
 *
 * @tsplus static effect/printer/Doc.Ops parenthesized
 * @tsplus getter effect/printer/Doc parenthesized
 */
export function parenthesized<A>(self: Doc<A>): Doc<A> {
  return self.surround(Doc.lparen, Doc.rparen)
}
