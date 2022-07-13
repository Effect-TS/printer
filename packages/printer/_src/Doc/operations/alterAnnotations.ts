/**
 * Change the annotations of a document. Individual annotations can be removed,
 * changed, or replaced by multiple ones.
 *
 * This is a general function that combines `unAnnotate` and `reAnnotate`, and
 * is useful for mapping semantic annotations (such as »this is a keyword«) to
 * display annotations (such as »this is red and underlined«) because some
 * backends may not care about certain annotations while others may.
 *
 * Annotations earlier in the new list will be applied earlier, so returning
 * `[Bold, Green]` will result in a bold document that contains green text, and
 * not vice versa.
 *
 * Since this traverses the entire document tree, including the parts that are
 * not rendered (due to other layouts having better fit), it is preferable to
 * reannotate a document **after** producing the layout by using
 * `alterAnnotations` from the `SimpleDocStream` module.
 *
 * @tsplus static effect/printer/Doc.Aspects alterAnnotations
 * @tsplus pipeable effect/printer/Doc alterAnnotations
 */
export function alterAnnotations<A, B>(f: (a: A) => Collection<B>) {
  return (self: Doc<A>): Doc<B> => alterAnnotationsSafe(self, f).run
}

function alterAnnotationsSafe<A, B>(self: Doc<A>, f: (a: A) => Collection<B>): Eval<Doc<B>> {
  switch (self._tag) {
    case "Cat": {
      return Eval.suspend(alterAnnotationsSafe(self.left, f)).zipWith(alterAnnotationsSafe(self.right, f), Doc.cat)
    }
    case "FlatAlt": {
      return Eval.suspend(alterAnnotationsSafe(self.left, f)).zipWith(alterAnnotationsSafe(self.right, f), Doc.flatAlt)
    }
    case "Union": {
      return Eval.suspend(alterAnnotationsSafe(self.left, f)).zipWith(alterAnnotationsSafe(self.right, f), Doc.union)
    }
    case "Nest": {
      return Eval.suspend(alterAnnotationsSafe(self.doc, f)).map((doc) => Doc.nest(doc, self.indent))
    }
    case "Column": {
      return Eval.succeed(Doc.column((position) => alterAnnotationsSafe(self.react(position), f).run))
    }
    case "WithPageWidth": {
      return Eval.succeed(Doc.withPageWidth((pageWidth) => alterAnnotationsSafe(self.react(pageWidth), f).run))
    }
    case "Nesting": {
      return Eval.succeed(Doc.nesting((level) => alterAnnotationsSafe(self.react(level), f).run))
    }
    case "Annotated": {
      return alterAnnotationsSafe(self.doc, f).map((doc) =>
        Chunk.from(f(self.annotation)).reduceRight(doc, (b, doc) => doc.annotate(b))
      )
    }
    default: {
      return Eval.succeed(self as unknown as Doc<B>)
    }
  }
}
