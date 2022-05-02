/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops dullBackgroundColor
 */
export function dullBackgroundColor(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    background: Option.some(SGR.SetColor(color, false, Layer.Background))
  };
}
