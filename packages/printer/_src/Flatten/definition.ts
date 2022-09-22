/**
 * Because certain documents do not change after removal of newlines, etc, there
 * is no point in creating a `Union` of the flattened and unflattened versions.
 * All this leads to is the introduction of two possible branches for a layout
 * algorithm to take, resulting in potentially exponential behavior on deeply
 * nested examples.
 *
 * @tsplus type effect/printer/Flatten
 */
export type Flatten<A> = Flattened<A> | AlreadyFlat | NeverFlat

/**
 * @tsplus type effect/printer/Flatten.Ops
 */
export interface FlattenOps {
  $: FlattenAspects
}
export const Flatten: FlattenOps = {
  $: {}
}

export interface FlattenF extends HKT {
  readonly type: Flatten<this["A"]>
}

/**
 * @tsplus type effect/printer/Flatten.Aspects
 */
export interface FlattenAspects {}

/**
 * Represents a `FlattenResult` where `A` is likely flatter than the input.
 *
 * @tsplus type effect/printer/Flatten/Flattened
 */
export interface Flattened<A> {
  readonly _tag: "Flattened"
  readonly value: A
}

/**
 * Represents a `FlattenResult` where the input was already flat.
 *
 * @tsplus type effect/printer/Flatten/AlreadyFlat
 */
export interface AlreadyFlat {
  readonly _tag: "AlreadyFlat"
}

/**
 * Represents a `FlattenResult` where the input cannot be flattened.
 *
 * @tsplus type effect/printer/Flatten/NeverFlat
 */
export interface NeverFlat {
  readonly _tag: "NeverFlat"
}

/**
 * @tsplus static effect/printer/Flatten.Ops Flattened
 */
export function flattened<A>(value: A): Flattened<A> {
  return {
    _tag: "Flattened",
    value
  }
}

/**
 * @tsplus static effect/printer/Flatten.Ops AlreadyFlat
 */
export const alreadyFlat: Flatten<never> = {
  _tag: "AlreadyFlat"
}

/**
 * @tsplus static effect/printer/Flatten.Ops NeverFlat
 */
export const neverFlat: Flatten<never> = {
  _tag: "NeverFlat"
}

/**
 * @tsplus static effect/printer/Flatten.Ops isFlattened
 */
export function isFlattened<A>(a: Flatten<A>): a is Flattened<A> {
  return a._tag === "Flattened"
}

/**
 * @tsplus static effect/printer/Flatten.Ops isAlreadyFlat
 */
export function isAlreadyFlat<A>(a: Flatten<A>): a is AlreadyFlat {
  return a._tag === "AlreadyFlat"
}

/**
 * @tsplus static effect/printer/Flatten.Ops isNeverFlat
 */
export function isNeverFlat<A>(a: Flatten<A>): a is NeverFlat {
  return a._tag === "NeverFlat"
}
