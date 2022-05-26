/**
 * @tsplus type ets/printer/Layout
 */
export interface Layout<A> {
  (options: LayoutOptions): DocStream<A>
}

/**
 * @tsplus type ets/printer/Layout/Ops
 */
export interface LayoutOps {}
export const Layout: LayoutOps = {}

/**
 * @tsplus unify ets/printer/Layout
 */
export function unifyLayout<X extends Layout<any>>(
  self: X
): Layout<
  [X] extends [Layout<infer AX>] ? AX : never
> {
  return self
}
