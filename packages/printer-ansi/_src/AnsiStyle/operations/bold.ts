/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops bold
 */
export const bold: AnsiStyle = {
  ...AnsiStyle.AssociativeIdentity.identity,
  bold: Maybe.some(SGR.SetBold(true))
}
