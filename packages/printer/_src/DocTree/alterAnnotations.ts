/**
 * Change the annotation of a document to a different annotation, or none at
 * all.
 *
 * @tsplus fluent ets/printer/DocTree alterAnnotations
 */
export function alterAnnotations_<A, B>(
  self: DocTree<A>,
  f: (a: A) => Collection<B>
): DocTree<B> {
  return alterAnnotationsSafe(self, f).run();
}

/**
 * Change the annotation of a document to a different annotation, or none at
 * all.
 *
 * @tsplus static ets/printer/DocTree/Aspects alterAnnotations
 */
export const alterAnnotations = Pipeable(alterAnnotations_);

export function alterAnnotationsSafe<A, B>(
  self: DocTree<A>,
  f: (a: A) => Collection<B>
): Eval<DocTree<B>> {
  switch (self._tag) {
    case "EmptyTree": {
      return Eval.succeed(DocTree.empty);
    }
    case "CharTree": {
      return Eval.succeed(DocTree.char(self.char));
    }
    case "TextTree": {
      return Eval.succeed(DocTree.text(self.text));
    }
    case "LineTree": {
      return Eval.succeed(DocTree.line(self.indentation));
    }
    case "AnnotationTree": {
      return Chunk.from(f(self.annotation)).reduceRight(
        Eval.suspend(alterAnnotationsSafe(self.tree, f)),
        (b, acc) => acc.map((tree) => DocTree.annotation(tree, b))
      );
    }
    case "ConcatTree": {
      return Eval.succeed(DocTree.concat(self.trees.map((tree) => Eval.suspend(alterAnnotationsSafe(tree, f)).run())));
    }
  }
}
