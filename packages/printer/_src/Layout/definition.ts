/**
 * @tsplus type effect/printer/Layout
 */
export interface Layout<A> {
  (options: Layout.Options): DocStream<A>
}

export declare namespace Layout {
  export type Options = LayoutOptions
  export type Pipeline<A> = LayoutPipeline<A>
}

/**
 * @tsplus type effect/printer/Layout.Ops
 */
export interface LayoutOps {
  readonly $: LayoutAspects
}
export const Layout: LayoutOps = {
  $: {}
}

/**
 * @tsplus type effect/printer/Layout.Aspects
 */
export interface LayoutAspects {}

/**
 * @tsplus unify effect/printer/Layout
 */
export function unifyLayout<X extends Layout<any>>(
  self: X
): Layout<
  [X] extends [Layout<infer AX>] ? AX : never
> {
  return self
}
