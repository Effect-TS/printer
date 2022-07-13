/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops italicized
 */
export const italicized: AnsiStyle = {
  ...AnsiStyle.AssociativeIdentity.identity,
  italicized: Maybe.some(SGR.SetItalicized(true))
}
