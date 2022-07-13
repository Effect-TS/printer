/**
 * @tsplus static effect/printer-ansi/AnsiDoc.Ops renderSmartAnsiDefault
 * @tsplus getter effect/printer-ansi/AnsiDoc renderSmartAnsiDefault
 */
export function renderSmartUnbounded(self: AnsiDoc): string {
  return self.layoutSmart(LayoutOptions(PageWidth.Unbounded)).renderAnsi
}
