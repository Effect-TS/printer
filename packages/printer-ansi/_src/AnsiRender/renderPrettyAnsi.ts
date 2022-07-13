/**
 * @tsplus static effect/printer-ansi/AnsiDoc.Aspects renderPrettyAnsi
 * @tsplus pipeable effect/printer-ansi/AnsiDoc renderPrettyAnsi
 */
export function renderPrettyAnsi(lineWidth: number, ribbonFraction = 1) {
  return (self: AnsiDoc): string =>
    self.layoutPretty(
      Layout.Options(PageWidth.AvailablePerLine(lineWidth, ribbonFraction))
    ).renderAnsi
}
