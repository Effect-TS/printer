/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops backgroundColor
 */
export function backgroundColor(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    background: Option.some(SGR.SetColor(color, true, Layer.Background))
  }
}
