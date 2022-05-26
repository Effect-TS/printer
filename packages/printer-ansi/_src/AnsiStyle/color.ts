/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops color
 */
export function color(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    foreground: Option.some(SGR.SetColor(color, true, Layer.Foreground))
  }
}
