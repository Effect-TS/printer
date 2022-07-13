/**
 * Removes all annotations from a document.
 *
 * **Note**: with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to unannotate a document after producing the
 * layout using `unAnnotateS`.
 *
 * @tsplus static effect/printer/Doc.Ops unAnnotate
 * @tsplus getter effect/printer/Doc unAnnotate
 */
export function unAnnotate<A>(self: Doc<A>): Doc<never> {
  return self.alterAnnotations(() => [])
}
