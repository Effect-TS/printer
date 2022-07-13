/**
 * Change the annotation of a document to a different annotation, or none at
 * all.
 *
 * @tsplus static effect/printer/DocTree.Aspects alterAnnotations
 * @tsplus pipeable effect/printer/DocTree alterAnnotations
 */
export function alterAnnotations<A, B>(f: (a: A) => Collection<B>) {
  return (self: DocTree<A>): DocTree<B> => alterAnnotationsSafe(self, f).run
}

export function alterAnnotationsSafe<A, B>(
  self: DocTree<A>,
  f: (a: A) => Collection<B>
): Eval<DocTree<B>> {
  switch (self._tag) {
    case "EmptyTree": {
      return Eval.succeed(DocTree.empty)
    }
    case "CharTree": {
      return Eval.succeed(DocTree.char(self.char))
    }
    case "TextTree": {
      return Eval.succeed(DocTree.text(self.text))
    }
    case "LineTree": {
      return Eval.succeed(DocTree.line(self.indentation))
    }
    case "AnnotationTree": {
      return Chunk.from(f(self.annotation)).reduceRight(
        Eval.suspend(alterAnnotationsSafe(self.tree, f)),
        (b, acc) => acc.map((tree) => DocTree.annotation(tree, b))
      )
    }
    case "ConcatTree": {
      return Eval.succeed(DocTree.concat(self.trees.map((tree) => Eval.suspend(alterAnnotationsSafe(tree, f)).run)))
    }
  }
}
