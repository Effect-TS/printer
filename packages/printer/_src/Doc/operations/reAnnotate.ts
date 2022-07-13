/**
 * Changes the annotation of a document. Useful for modifying documents embedded
 * with one form of annotation with a more general annotation.
 *
 * **Note** that with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to reannotate a document after producing the
 * layout using `reAnnotateS`.
 *
 * @tsplus static effect/printer/Doc.Aspects map
 * @tsplus static effect/printer/Doc.Aspects reAnnotate
 * @tsplus pipeable effect/printer/Doc map
 * @tsplus pipeable effect/printer/Doc reAnnotate
 */
export function reAnnotate<A, B>(f: (a: A) => B) {
  return (self: Doc<A>): Doc<B> =>
    self.alterAnnotations(
      (annotation) => [f(annotation)]
    )
}
