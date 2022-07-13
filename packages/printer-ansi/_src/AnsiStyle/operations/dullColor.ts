/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops dullColor
 */
export function dullColor(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    foreground: Maybe.some(SGR.SetColor(color, false, Layer.Foreground))
  }
}
