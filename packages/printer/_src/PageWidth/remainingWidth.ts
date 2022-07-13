/**
 * Calculates the remaining width on the current line.
 *
 * @tsplus static effect/printer/PageWidth.Ops remainingWidth
 */
export function remainingWidth(
  lineLength: number,
  ribbonFraction: number,
  lineIndent: number,
  currentColumn: number
): number {
  const columnsLeftInLine = lineLength - currentColumn
  const ribbonWidth = Math.max(
    0,
    Math.min(lineLength, Math.floor(lineLength * ribbonFraction))
  )
  const columnsLeftInRibbon = lineIndent + ribbonWidth - currentColumn
  return Math.min(columnsLeftInLine, columnsLeftInRibbon)
}
