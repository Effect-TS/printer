/**
 * @tsplus static effect/printer-ansi/AnsiDoc.Ops renderPrettyAnsiDefault
 * @tsplus getter effect/printer-ansi/AnsiDoc renderPrettyAnsiDefault
 */
export function renderPrettyAnsiDefault(self: AnsiDoc): string {
  return self.layoutPretty(LayoutOptions.default).renderAnsi
}
