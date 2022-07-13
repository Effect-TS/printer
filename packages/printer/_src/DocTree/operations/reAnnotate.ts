/**
 * Change the annotation of a `DocTree`.
 *
 * @tsplus static effect/printer/DocTree.Aspects map
 * @tsplus static effect/printer/DocTree.Aspects reAnnotate
 * @tsplus pipeable effect/printer/DocTree map
 * @tsplus pipeable effect/printer/DocTree reAnnotate
 */
export function reAnnotate<A, B>(f: (a: A) => B) {
  return (self: DocTree<A>): DocTree<B> => self.alterAnnotations((a) => [f(a)])
}
