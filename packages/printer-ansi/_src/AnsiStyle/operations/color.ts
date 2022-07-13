/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops color
 */
export function color(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    foreground: Maybe.some(SGR.SetColor(color, true, Layer.Foreground))
  }
}
