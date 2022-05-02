/**
 * @tsplus fluent ets/printer-ansi/AnsiDoc renderSmartAnsi
 */
export function renderSmartAnsi_(self: AnsiDoc, lineWidth: number, ribbonFraction = 1): string {
  return self.layoutSmart(LayoutOptions(PageWidth.AvailablePerLine(lineWidth, ribbonFraction))).renderAnsi();
}

/**
 * @tsplus static ets/printer-ansi/AnsiDoc/Aspects renderSmartAnsi
 */
export const renderSmartAnsi = Pipeable(renderSmartAnsi_);
