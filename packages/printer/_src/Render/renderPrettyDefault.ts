/**
 * @tsplus static effect/printer/Doc.Ops renderPrettyDefault
 * @tsplus getter effect/printer/Doc renderPrettyDefault
 */
export function renderPrettyDefault<A>(self: Doc<A>): string {
  return self.layoutPretty(LayoutOptions.default).render
}
