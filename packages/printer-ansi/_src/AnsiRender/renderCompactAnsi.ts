/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderCompactAnsi
 */
export function renderCompactAnsi(self: AnsiDoc): string {
  return self.layoutCompact().renderAnsi();
}
