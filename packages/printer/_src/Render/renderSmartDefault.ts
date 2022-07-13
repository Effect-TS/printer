/**
 * @tsplus static effect/printer/Doc.Ops renderSmartDefault
 * @tsplus getter effect/printer/Doc renderSmartDefault
 */
export function renderSmartDefault<A>(self: Doc<A>): string {
  return self.layoutSmart(LayoutOptions.default).render
}
