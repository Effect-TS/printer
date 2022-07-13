/**
 * @tsplus static effect/printer/Doc.Aspects renderPretty
 * @tsplus pipeable effect/printer/Doc renderPretty
 */
export function renderPretty(lineWidth: number, ribbonFraction = 1) {
  return <A>(self: Doc<A>): string => {
    const pageWidth = PageWidth.AvailablePerLine(lineWidth, ribbonFraction)
    const options = LayoutOptions(pageWidth)
    return self.layoutPretty(options).render
  }
}
