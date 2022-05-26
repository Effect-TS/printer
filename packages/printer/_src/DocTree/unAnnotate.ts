/**
 * Remove all annotations from a `DocTree`.
 *
 * @tsplus fluent ets/printer/DocTree unAnnotate
 */
export function unAnnotate<A>(self: DocTree<A>): DocTree<never> {
  return self.alterAnnotations(() => [])
}
