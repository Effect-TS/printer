/**
 * Removes all annotations from a document.
 *
 * **Note**: with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to unannotate a document after producing the
 * layout using `unAnnotateS`.
 *
 * @tsplus fluent ets/printer/Doc unAnnotate
 */
export function unAnnotate<A>(self: Doc<A>): Doc<never> {
  return self.alterAnnotations(() => []);
}
