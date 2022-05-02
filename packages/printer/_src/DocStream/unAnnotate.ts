/**
 * Remove all annotations from a document.
 *
 * @tsplus fluent ets/printer/DocStream unAnnotate
 */
export function unAnnotate<A>(self: DocStream<A>): DocStream<never> {
  return unAnnotateSafe(self).run();
}

function unAnnotateSafe<A>(self: DocStream<A>): Eval<DocStream<never>> {
  switch (self._tag) {
    case "CharStream": {
      return Eval.suspend(unAnnotateSafe(self.stream)).map((stream) => DocStream.char(stream, self.char));
    }
    case "TextStream": {
      return Eval.suspend(unAnnotateSafe(self.stream)).map((stream) => DocStream.text(stream, self.text));
    }
    case "LineStream": {
      return Eval.suspend(unAnnotateSafe(self.stream)).map((stream) => DocStream.line(stream, self.indentation));
    }
    case "PushAnnotationStream":
    case "PopAnnotationStream": {
      return Eval.suspend(unAnnotateSafe(self.stream));
    }
    default: {
      return Eval.succeed(self as unknown as DocStream<never>);
    }
  }
}
