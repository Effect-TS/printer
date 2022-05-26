type AnnotationRemoval = "Remove" | "DontRemove"

const Remove: AnnotationRemoval = "Remove"

const DontRemove: AnnotationRemoval = "DontRemove"

/**
 * Changes the annotation of a document to a different annotation, or to
 * none at all.
 *
 * @tsplus fluent ets/printer/DocStream alterAnnotations
 */
export function alterAnnotations_<A, B>(self: DocStream<A>, f: (a: A) => Option<B>): DocStream<B> {
  return alterAnnotationSafe(self, f, []).run()
}

/**
 * Changes the annotation of a document to a different annotation, or to
 * none at all.
 *
 * @tsplus static ets/printer/DocStream/Aspects alterAnnotations
 */
export const alterAnnotations = Pipeable(alterAnnotations_)

function alterAnnotationSafe<A, B>(
  self: DocStream<A>,
  f: (a: A) => Option<B>,
  stack: Array<AnnotationRemoval>
): Eval<DocStream<B>> {
  switch (self._tag) {
    case "CharStream": {
      return Eval.suspend(alterAnnotationSafe(self.stream, f, stack)).map((stream) => DocStream.char(stream, self.char))
    }
    case "TextStream": {
      return Eval.suspend(alterAnnotationSafe(self.stream, f, stack)).map((stream) => DocStream.text(stream, self.text))
    }
    case "LineStream": {
      return Eval.suspend(alterAnnotationSafe(self.stream, f, stack)).map((stream) =>
        DocStream.line(stream, self.indentation)
      )
    }
    case "PushAnnotationStream": {
      const altered = f(self.annotation)
      if (altered.isSome()) {
        return Eval.suspend(alterAnnotationSafe(self.stream, f, [DontRemove, ...stack])).map((stream) =>
          DocStream.pushAnnotation(stream, altered.value)
        )
      }
      return Eval.suspend(alterAnnotationSafe(self.stream, f, [Remove, ...stack]))
    }
    case "PopAnnotationStream": {
      if (stack.length === 0) {
        throw new Error("bug, we ended up with an empty stack to pop from!")
      }
      const [head, ...tail] = stack
      if (head === DontRemove) {
        return Eval.suspend(alterAnnotationSafe(self.stream, f, tail)).map(DocStream.popAnnotation)
      }
      return Eval.suspend(alterAnnotationSafe(self.stream, f, tail))
    }
    default: {
      return Eval.succeed(self as unknown as DocStream<B>)
    }
  }
}
