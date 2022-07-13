/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops backgroundColor
 */
export function backgroundColor(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    background: Maybe.some(SGR.SetColor(color, true, Layer.Background))
  }
}
