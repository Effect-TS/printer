/**
 * @tsplus type effect/printer-ansi/AnsiStyle
 */
export interface AnsiStyle {
  readonly foreground: Maybe<SGR>
  readonly background: Maybe<SGR>
  readonly bold: Maybe<SGR>
  readonly italicized: Maybe<SGR>
  readonly underlined: Maybe<SGR>
}

/**
 * @tsplus type effect/printer-ansi/AnsiStyle.Ops
 */
export interface AnsiStyleOps {}
export const AnsiStyle: AnsiStyleOps = {}
