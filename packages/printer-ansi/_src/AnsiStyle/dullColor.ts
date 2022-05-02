/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops dullColor
 */
export function dullColor(color: Color): AnsiStyle {
  return {
    ...AnsiStyle.AssociativeIdentity.identity,
    foreground: Option.some(SGR.SetColor(color, false, Layer.Foreground))
  };
}
