/**
 * @tsplus type effect/printer-ansi/SGR
 */
export type SGR = Reset | SetBold | SetItalicized | SetUnderlined | SetColor

/**
 * @tsplus type effect/printer-ansi/SGR.Ops
 */
export interface SGROps {}
export const SGR: SGROps = {}

export class Reset {
  readonly _tag = "Reset"
}

export class SetBold {
  readonly _tag = "SetBold"
  constructor(readonly bold: boolean) {}
}

export class SetItalicized {
  readonly _tag = "SetItalicized"
  constructor(readonly italicized: boolean) {}
}

export class SetUnderlined {
  readonly _tag = "SetUnderlined"
  constructor(readonly underlined: boolean) {}
}

export class SetColor {
  readonly _tag = "SetColor"
  constructor(readonly color: Color, readonly vivid: boolean, readonly layer: Layer) {}
}

/**
 * @tsplus static effect/printer-ansi/SGR.Ops Reset
 */
export const reset: SGR = new Reset()

/**
 * @tsplus static effect/printer-ansi/SGR.Ops SetBold
 */
export function setBold(bold: boolean): SGR {
  return new SetBold(bold)
}

/**
 * @tsplus static effect/printer-ansi/SGR.Ops SetItalicized
 */
export function setItalicized(italicized: boolean): SGR {
  return new SetItalicized(italicized)
}

/**
 * @tsplus static effect/printer-ansi/SGR.Ops SetUnderlined
 */
export function setUnderlined(underlined: boolean): SGR {
  return new SetUnderlined(underlined)
}

/**
 * @tsplus static effect/printer-ansi/SGR.Ops SetColor
 */
export function setColor(color: Color, vivid: boolean, layer: Layer): SGR {
  return new SetColor(color, vivid, layer)
}
