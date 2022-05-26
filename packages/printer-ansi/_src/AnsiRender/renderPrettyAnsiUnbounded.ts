/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderPrettyAnsiUnbounded
 */
export function renderPrettyAnsiUnbounded(self: AnsiDoc): string {
  return self.layoutPretty(LayoutOptions(PageWidth.Unbounded)).renderAnsi()
}
