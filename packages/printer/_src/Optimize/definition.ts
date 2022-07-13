/**
 * Represents optimization of a given document tree through fusion of redundant
 * document nodes.
 *
 * @tsplus type effect/printer/Optimize
 */
export interface Optimize<A> {
  (depth: Optimize.Depth): Doc<A>
}

/**
 * @tsplus type effect/printer/Optimize.Ops
 */
export interface OptimizeOps {
  readonly $: OptimizeAspects
}
export const Optimize: OptimizeOps = {
  $: {}
}

/**
 * @tsplus type effect/printer/Optimize.Aspects
 */
export interface OptimizeAspects {}

export declare namespace Optimize {
  export type Depth = FusionDepth
}

/**
 * @tsplus unify effect/printer/Optimize
 */
export function unifyOptimize<X extends Optimize<any>>(
  self: X
): Optimize<
  [X] extends [Optimize<infer AX>] ? AX : never
> {
  return self
}

/**
 * Represents an instruction that determines how deeply the document fusion
 * optimizer should traverse the document tree.
 *
 * @tsplus type effect/printer/Optimize.Depth
 */
export type FusionDepth = Shallow | Deep

/**
 * @tsplus type effect/printer/Optimize.Depth.Ops
 */
export interface FusionDepthOps {}
/**
 * @tsplus static effect/printer/Optimize.Ops Depth
 */
export const FusionDepth: FusionDepthOps = {}

/**
 * Instructs the document fusion optimizer to avoid diving deeply into nested
 * documents, fusing mostly concatenations of text nodes together.
 */
export interface Shallow {
  readonly _tag: "Shallow"
}

/**
 * Instructs the document fusion optimizer to recurse into all leaves of the
 * document tree, including different layout alternatives and all
 * location-sensitive values (i.e. those created by `nesting`), which cannot be
 * fused before, but only during, the layout process. As a result, the
 * performance cost of using deep document fusion optimization is often hard to
 * predict and depends on the interplay between page layout and the document
 * that is to be pretty printed.
 *
 * This value should only be utilized if profiling demonstrates that it is
 * **significantly** faster than using `Shallow`.
 */
export interface Deep {
  readonly _tag: "Deep"
}

/**
 * @tsplus static effect/printer/Optimize.Depth.Ops Shallow
 */
export const Shallow: FusionDepth = {
  _tag: "Shallow"
}

/**
 * @tsplus static effect/printer/Optimize.Depth.Ops Deep
 */
export const Deep: FusionDepth = {
  _tag: "Deep"
}
