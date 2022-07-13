/**
 * @tsplus static effect/printer/Doc.Ops renderPrettyUnbounded
 * @tsplus getter effect/printer/Doc renderPrettyUnbounded
 */
export function renderPrettyUnbounded<A>(self: Doc<A>): string {
  return self.layoutPretty(LayoutOptions(PageWidth.Unbounded)).render
}
