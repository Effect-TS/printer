/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops underlined
 */
export const underlined: AnsiStyle = {
  ...AnsiStyle.AssociativeIdentity.identity,
  underlined: Maybe.some(SGR.SetUnderlined(true))
}
