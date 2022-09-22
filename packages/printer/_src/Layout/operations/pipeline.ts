/**
 * Represents a list of nesting level/document pairs that are yet to be laid
 * out.
 *
 * @tsplus type effect/printer/Layout.Pipeline
 */
export type LayoutPipeline<A> = Nil | Cons<A> | UndoAnnotation<A>

/**
 * @tsplus type effect/printer/Layout.Pipeline.Ops
 */
export interface LayoutPipelineOps {}
/**
 * @tsplus static effect/printer/Layout.Ops Pipeline
 */
export const LayoutPipeline: LayoutPipelineOps = {}

/**
 * @tsplus type effect/printer/Layout.Pipeline/Nil
 */
export interface Nil {
  readonly _tag: "Nil"
}

/**
 * @tsplus type effect/printer/Layout.Pipeline/Cons
 */
export interface Cons<A> {
  readonly _tag: "Cons"
  readonly indent: number
  readonly document: Doc<A>
  readonly pipeline: LayoutPipeline<A>
}

/**
 * @tsplus type effect/printer/Layout.Pipeline/UndoAnnotation
 */
export interface UndoAnnotation<A> {
  readonly _tag: "UndoAnnotation"
  readonly pipeline: LayoutPipeline<A>
}

/**
 * @tsplus static effect/printer/Layout.Pipeline.Ops nil
 */
export const nil: LayoutPipeline<never> = {
  _tag: "Nil"
}

/**
 * @tsplus static effect/printer/Layout.Pipeline.Ops cons
 */
export function cons<A>(
  indent: number,
  document: Doc<A>,
  pipeline: LayoutPipeline<A>
): LayoutPipeline<A> {
  return {
    _tag: "Cons",
    indent,
    document,
    pipeline
  }
}

/**
 * @tsplus static effect/printer/Layout.Pipeline.Ops undoAnnotation
 */
export function undoAnnotation<A>(pipeline: LayoutPipeline<A>): LayoutPipeline<A> {
  return {
    _tag: "UndoAnnotation",
    pipeline
  }
}
