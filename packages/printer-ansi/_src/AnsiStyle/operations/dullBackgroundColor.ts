/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops dullBackgroundColor
 */
export function dullBackgroundColor(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    background: Maybe.some(SGR.SetColor(color, false, Layer.Background))
  }
}
