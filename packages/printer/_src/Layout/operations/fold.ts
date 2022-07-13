/**
 * @tsplus static effect/printer/Layout.Aspects fold
 * @tsplus pipeable effect/printer/Layout fold
 */
export function fold<A, R>(
  patterns: {
    readonly Nil: () => R
    readonly Cons: (indent: number, document: Doc<A>, pipeline: Layout.Pipeline<A>) => R
    readonly UndoAnnotation: (pipeline: Layout.Pipeline<A>) => R
  }
) {
  return (pipeline: Layout.Pipeline<A>): R => {
    switch (pipeline._tag) {
      case "Nil":
        return patterns.Nil()
      case "Cons":
        return patterns.Cons(pipeline.indent, pipeline.document, pipeline.pipeline)
      case "UndoAnnotation":
        return patterns.UndoAnnotation(pipeline.pipeline)
    }
  }
}
