/**
 * @tsplus fluent ets/printer/Doc renderPrettyDefault
 */
export function renderPrettyDefault<A>(self: Doc<A>): string {
  return self.layoutPretty(LayoutOptions.default).render()
}
