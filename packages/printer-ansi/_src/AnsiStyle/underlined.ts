/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops underlined
 */
export const underlined: AnsiStyle = {
  ...AnsiStyle.AssociativeIdentity.identity,
  underlined: Option.some(SGR.SetUnderlined(true))
}
