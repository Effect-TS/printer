/**
 * @tsplus fluent ets/printer/Doc renderPrettyUnbounded
 */
export function renderPrettyUnbounded<A>(self: Doc<A>): string {
  return self.layoutPretty(LayoutOptions(PageWidth.Unbounded)).render()
}
