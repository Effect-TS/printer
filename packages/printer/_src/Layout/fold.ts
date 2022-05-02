/**
 * @tsplus fluent ets/printer/Layout fold
 */
export function fold_<A, R>(
  pipeline: LayoutPipeline<A>,
  patterns: {
    readonly Nil: () => R;
    readonly Cons: (indent: number, document: Doc<A>, pipeline: LayoutPipeline<A>) => R;
    readonly UndoAnnotation: (pipeline: LayoutPipeline<A>) => R;
  }
): R {
  switch (pipeline._tag) {
    case "Nil":
      return patterns.Nil();
    case "Cons":
      return patterns.Cons(pipeline.indent, pipeline.document, pipeline.pipeline);
    case "UndoAnnotation":
      return patterns.UndoAnnotation(pipeline.pipeline);
  }
}

/**
 * @tsplus static ets/printer/Layout fold
 */
export const fold = Pipeable(fold_);
