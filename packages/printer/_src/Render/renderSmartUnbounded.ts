/**
 * @tsplus static effect/printer/Doc.Ops renderSmartUnbounded
 * @tsplus getter effect/printer/Doc renderSmartUnbounded
 */
export function renderSmartUnbounded<A>(self: Doc<A>): string {
  return self.layoutSmart(LayoutOptions(PageWidth.Unbounded)).render
}
