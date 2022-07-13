/**
 * @tsplus static effect/printer/Doc.Ops renderCompact
 * @tsplus getter effect/printer/Doc renderCompact
 */
export function renderCompact<A>(self: Doc<A>): string {
  return self.layoutCompact.render
}
