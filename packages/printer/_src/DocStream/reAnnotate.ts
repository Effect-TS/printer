/**
 * Modify the annotations of a document.
 *
 * @tsplus fluent ets/printer/DocStream map
 * @tsplus fluent ets/printer/DocStream reAnnotate
 */
export function reAnnotate_<A, B>(self: DocStream<A>, f: (a: A) => B): DocStream<B> {
  return reAnnotateSafe(self, f).run();
}

/**
 * Modify the annotations of a document.
 *
 * @tsplus static ets/printer/DocStream/Aspects map
 * @tsplus static ets/printer/DocStream/Aspects reAnnotate
 */
export const reAnnotate = Pipeable(reAnnotate_);

function reAnnotateSafe<A, B>(self: DocStream<A>, f: (a: A) => B): Eval<DocStream<B>> {
  switch (self._tag) {
    case "CharStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) => DocStream.char(stream, self.char));
    }
    case "TextStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) => DocStream.text(stream, self.text));
    }
    case "LineStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) => DocStream.line(stream, self.indentation));
    }
    case "PushAnnotationStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f)).map((stream) =>
        DocStream.pushAnnotation(stream, f(self.annotation))
      );
    }
    case "PopAnnotationStream": {
      return Eval.suspend(reAnnotateSafe(self.stream, f));
    }
    default: {
      return Eval.succeed(self as unknown as DocStream<B>);
    }
  }
}
