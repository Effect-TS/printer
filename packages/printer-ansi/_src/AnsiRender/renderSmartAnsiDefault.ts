/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderSmartAnsiDefault
 */
export function renderSmartAnsiDefault(self: AnsiDoc): string {
  return self.layoutSmart(LayoutOptions.default).renderAnsi()
}
