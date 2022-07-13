/**
 * @tsplus static effect/printer-ansi/AnsiDoc.Ops renderPrettyAnsiUnbounded
 * @tsplus getter effect/printer-ansi/AnsiDoc renderPrettyAnsiUnbounded
 */
export function renderPrettyAnsiUnbounded(self: AnsiDoc): string {
  return self.layoutPretty(LayoutOptions(PageWidth.Unbounded)).renderAnsi
}
