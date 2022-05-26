/**
 * @tsplus type ets/printer-ansi/Color
 */
export type Color = Black | Red | Green | Yellow | Blue | Magenta | Cyan | White

/**
 * @tsplus type ets/printer-ansi/Color/Ops
 */
export interface ColorOps {}
export const Color: ColorOps = {}

export interface Black {
  readonly _tag: "Black"
}

export interface Red {
  readonly _tag: "Red"
}

export interface Green {
  readonly _tag: "Green"
}

export interface Yellow {
  readonly _tag: "Yellow"
}

export interface Blue {
  readonly _tag: "Blue"
}

export interface Magenta {
  readonly _tag: "Magenta"
}

export interface Cyan {
  readonly _tag: "Cyan"
}

export interface White {
  readonly _tag: "White"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Black
 */
export const Black: Color = {
  _tag: "Black"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Red
 */
export const Red: Color = {
  _tag: "Red"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Green
 */
export const Green: Color = {
  _tag: "Green"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Yellow
 */
export const Yellow: Color = {
  _tag: "Yellow"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Blue
 */
export const Blue: Color = {
  _tag: "Blue"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Magenta
 */
export const Magenta: Color = {
  _tag: "Magenta"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops Cyan
 */
export const Cyan: Color = {
  _tag: "Cyan"
}

/**
 * @tsplus static ets/printer-ansi/Color/Ops White
 */
export const White: Color = {
  _tag: "White"
}
