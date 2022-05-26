/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderPrettyAnsiDefault
 */
export function renderPrettyAnsiDefault(self: AnsiDoc): string {
  return self.layoutPretty(LayoutOptions.default).renderAnsi()
}
