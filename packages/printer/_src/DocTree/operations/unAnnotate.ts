/**
 * Remove all annotations from a `DocTree`.
 *
 * @tsplus static effect/printer/DocTree.Aspects unAnnotate
 * @tsplus getter effect/printer/DocTree unAnnotate
 */
export function unAnnotate<A>(self: DocTree<A>): DocTree<never> {
  return self.alterAnnotations(() => [])
}
