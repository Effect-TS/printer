/**
 * @tsplus type ets/printer-ansi/Layer
 */
export type Layer = Background | Foreground;

/**
 * @tsplus type ets/printer-ansi/Layer/Ops
 */
export interface LayerOps {}
export const Layer: LayerOps = {};

export interface Background {
  readonly _tag: "Background";
}

export interface Foreground {
  readonly _tag: "Foreground";
}

/**
 * @tsplus static ets/printer-ansi/Layer/Ops Foreground
 */
export const Foreground: Layer = {
  _tag: "Foreground"
};

/**
 * @tsplus static ets/printer-ansi/Layer/Ops Background
 */
export const Background: Layer = {
  _tag: "Background"
};
