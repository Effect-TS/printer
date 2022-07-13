/**
 * Modify the annotations of a document.
 *
 * @tsplus static effect/printer/DocStream.Aspects map
 * @tsplus static effect/printer/DocStream.Aspects reAnnotate
 * @tsplus pipeable effect/printer/DocStream map
 * @tsplus pipeable effect/printer/DocStream reAnnotate
 */
export function reAnnotate<A, B>(f: (a: A) => B) {
  return (self: DocStream<A>): DocStream<B> => reAnnotateSafe(self, f).run
}

function reAnnotateSafe<A, B>(self: DocStream<A>, f: (a: A) => B): Eval<DocStream<B>> {
  switch (self._tag) {
    case "CharStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) => DocStream.char(stream, self.char))
    }
    case "TextStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) => DocStream.text(stream, self.text))
    }
    case "LineStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) => DocStream.line(stream, self.indentation))
    }
    case "PushAnnotationStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) =>
        DocStream.pushAnnotation(stream, f(self.annotation))
      )
    }
    case "PopAnnotationStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f))
    }
    default: {
      return Eval.succeed(self as unknown as DocStream<B>)
    }
  }
}
