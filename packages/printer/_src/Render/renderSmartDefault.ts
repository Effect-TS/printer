/**
 * @tsplus fluent ets/printer/Doc renderSmartDefault
 */
export function renderSmartDefault<A>(self: Doc<A>): string {
  return self.layoutSmart(LayoutOptions.default).render()
}
