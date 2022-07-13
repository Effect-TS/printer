/**
 * @tsplus static effect/printer-ansi/AnsiDoc.Aspects renderSmartAnsi
 * @tsplus pipeable effect/printer-ansi/AnsiDoc renderSmartAnsi
 */
export function renderSmartAnsi(lineWidth: number, ribbonFraction = 1) {
  return (self: AnsiDoc): string =>
    self.layoutSmart(
      Layout.Options(PageWidth.AvailablePerLine(lineWidth, ribbonFraction))
    ).renderAnsi
}
