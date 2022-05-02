/**
 * @tsplus type ets/printer-ansi/AnsiDoc
 */
export type AnsiDoc = Doc<AnsiStyle>;

/**
 * @tsplus type ets/printer-ansi/AnsiDoc/Ops
 */
export interface AnsiDocOps {
  $: AnsiDocAspects;
}
export const AnsiDoc: AnsiDocOps = {
  $: {}
};

/**
 * @tsplus type ets/printer-ansi/AnsiDoc/Aspects
 */
export interface AnsiDocAspects {}
