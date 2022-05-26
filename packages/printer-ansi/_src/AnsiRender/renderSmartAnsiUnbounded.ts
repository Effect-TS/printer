/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderSmartAnsiDefault
 */
export function renderSmartUnbounded(self: AnsiDoc): string {
  return self.layoutSmart(LayoutOptions(PageWidth.Unbounded)).renderAnsi()
}
