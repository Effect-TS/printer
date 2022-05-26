/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops italicized
 */
export const italicized: AnsiStyle = {
  ...AnsiStyle.AssociativeIdentity.identity,
  italicized: Option.some(SGR.SetItalicized(true))
}
