/**
 * @tsplus fluent ets/printer/Doc renderSmartUnbounded
 */
export function renderSmartUnbounded<A>(self: Doc<A>): string {
  return self.layoutSmart(LayoutOptions(PageWidth.Unbounded)).render()
}
