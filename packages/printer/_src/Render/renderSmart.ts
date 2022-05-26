/**
 * @tsplus fluent ets/printer/Doc renderSmart
 */
export function renderSmart_<A>(
  self: Doc<A>,
  lineWidth: number,
  ribbonFraction = 1
): string {
  const pageWidth = PageWidth.AvailablePerLine(lineWidth, ribbonFraction)
  const options = LayoutOptions(pageWidth)
  return self.layoutSmart(options).render()
}

/**
 * @tsplus static ets/printer/Doc/Aspects renderSmart
 */
export const renderSmart = Pipeable(renderSmart_)
