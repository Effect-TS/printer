/**
 * Changes the annotation of a document. Useful for modifying documents embedded
 * with one form of annotation with a more general annotation.
 *
 * **Note** that with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to reannotate a document after producing the
 * layout using `reAnnotateS`.
 *
 * @tsplus fluent ets/printer/Doc map
 * @tsplus fluent ets/printer/Doc reAnnotate
 */
export function reAnnotate_<A, B>(self: Doc<A>, f: (a: A) => B): Doc<B> {
  return self.alterAnnotations((annotation) => [f(annotation)])
}

/**
 * Changes the annotation of a document. Useful for modifying documents embedded
 * with one form of annotation with a more general annotation.
 *
 * **Note** that with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to reannotate a document after producing the
 * layout using `reAnnotateS`.
 *
 * @tsplus static ets/printer/Doc/Aspects map
 * @tsplus static ets/printer/Doc/Aspects reAnnotate
 */
export const reAnnotate = Pipeable(reAnnotate_)
