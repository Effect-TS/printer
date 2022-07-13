/**
 * @tsplus type effect/printer-ansi/AnsiDoc
 */
export type AnsiDoc = Doc<AnsiStyle>

/**
 * @tsplus type effect/printer-ansi/AnsiDoc.Ops
 */
export interface AnsiDocOps {
  $: AnsiDocAspects
}
export const AnsiDoc: AnsiDocOps = {
  $: {}
}

/**
 * @tsplus type effect/printer-ansi/AnsiDoc.Aspects
 */
export interface AnsiDocAspects {}
