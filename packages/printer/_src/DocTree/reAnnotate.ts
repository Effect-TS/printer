/**
 * Change the annotation of a `DocTree`.
 *
 * @tsplus fluent ets/printer/DocTree map
 * @tsplus fluent ets/printer/DocTree reAnnotate
 */
export function reAnnotate_<A, B>(self: DocTree<A>, f: (a: A) => B): DocTree<B> {
  return self.alterAnnotations((a) => [f(a)])
}

/**
 * Change the annotation of a `DocTree`.
 *
 * @tsplus static ets/printer/DocTree/Aspects map
 * @tsplus static ets/printer/DocTree/Aspects reAnnotate
 */
export const reAnnotate = Pipeable(reAnnotate_)
