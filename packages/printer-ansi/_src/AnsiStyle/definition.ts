/**
 * @tsplus type ets/printer-ansi/AnsiStyle
 */
export interface AnsiStyle {
  readonly foreground: Option<SGR>
  readonly background: Option<SGR>
  readonly bold: Option<SGR>
  readonly italicized: Option<SGR>
  readonly underlined: Option<SGR>
}

/**
 * @tsplus type ets/printer-ansi/AnsiStyle/Ops
 */
export interface AnsiStyleOps {}
export const AnsiStyle: AnsiStyleOps = {}
