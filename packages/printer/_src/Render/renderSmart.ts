/**
 * @tsplus static effect/printer/Doc.Aspects renderSmart
 * @tsplus pipeable effect/printer/Doc renderSmart
 */
export function renderSmart<A>(lineWidth: number, ribbonFraction = 1) {
  return (self: Doc<A>): string => {
    const pageWidth = PageWidth.AvailablePerLine(lineWidth, ribbonFraction)
    const options = LayoutOptions(pageWidth)
    return self.layoutSmart(options).render
  }
}
