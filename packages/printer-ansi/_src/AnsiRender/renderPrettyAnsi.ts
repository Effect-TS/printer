/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderPrettyAnsi
 */
export function renderPrettyAnsi_(self: AnsiDoc, lineWidth: number, ribbonFraction = 1): string {
  return self.layoutPretty(
    LayoutOptions(PageWidth.AvailablePerLine(lineWidth, ribbonFraction))
  ).renderAnsi()
}

/**
 * @tsplus static ets/printer-ansi/AnsiDoc/Aspects renderPrettyAnsi
 */
export const renderPrettyAnsi = Pipeable(renderPrettyAnsi_)
