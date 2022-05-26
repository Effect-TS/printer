/**
 * @tsplus fluent ets/printer/DocTree foldMap
 */
export function foldMap_<A, I>(self: DocTree<A>, I: AssociativeIdentity<I>, f: (a: A) => I): I {
  return foldMapSafe(self, I, f).run()
}

/**
 * @tsplus static ets/printer/DocTree/Aspects foldMap
 */
export const foldMap = Pipeable(foldMap_)

function foldMapSafe<A, I>(
  self: DocTree<A>,
  I: AssociativeIdentity<I>,
  f: (a: A) => I
): Eval<I> {
  switch (self._tag) {
    case "EmptyTree": {
      return Eval.succeed(I.identity)
    }
    case "CharTree": {
      return Eval.succeed(I.identity)
    }
    case "TextTree": {
      return Eval.succeed(I.identity)
    }
    case "LineTree": {
      return Eval.succeed(I.identity)
    }
    case "AnnotationTree": {
      return Eval.suspend(foldMapSafe(self.tree, I, f)).map((i) => I.combine(f(self.annotation), i))
    }
    case "ConcatTree": {
      if (self.trees.isEmpty()) {
        return Eval.succeed(I.identity)
      }
      const trees = self.trees.map((tree) => Eval.suspend(foldMapSafe(tree, I, f)))
      const head = trees.unsafeHead()
      const tail = trees.unsafeTail()
      return tail.reduce(head, (acc, a) => acc.zipWith(a, I.combine))
    }
  }
}
