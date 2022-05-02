/**
 * @tsplus fluent ets/printer/Doc renderPretty
 */
export function renderPretty_<A>(
  self: Doc<A>,
  lineWidth: number,
  ribbonFraction = 1
): string {
  const pageWidth = PageWidth.AvailablePerLine(lineWidth, ribbonFraction);
  const options = LayoutOptions(pageWidth);
  return self.layoutPretty(options).render();
}

/**
 * @tsplus static ets/printer/Doc/Aspects renderPretty
 */
export const renderPretty = Pipeable(renderPretty_);
