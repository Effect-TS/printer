/**
 * @tsplus fluent ets/printer/Doc renderCompact
 */
export function renderCompact<A>(self: Doc<A>): string {
  return self.layoutCompact().render();
}
