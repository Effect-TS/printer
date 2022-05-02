/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops bold
 */
export const bold: AnsiStyle = {
  ...AnsiStyle.AssociativeIdentity.identity,
  bold: Option.some(SGR.SetBold(true))
};
