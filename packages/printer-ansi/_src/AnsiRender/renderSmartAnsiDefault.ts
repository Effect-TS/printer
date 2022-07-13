/**
 * @tsplus static effect/printer-ansi/AnsiDoc.Ops renderSmartAnsiDefault
 * @tsplus getter effect/printer-ansi/AnsiDoc renderSmartAnsiDefault
 */
export function renderSmartAnsiDefault(self: AnsiDoc): string {
  return self.layoutSmart(LayoutOptions.default).renderAnsi
}
