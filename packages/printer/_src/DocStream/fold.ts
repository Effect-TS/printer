/**
 * @tsplus fluent ets/printer/DocStream fold
 */
export function fold_<A, R>(
  self: DocStream<A>,
  patterns: {
    readonly FailedStream: () => R
    readonly EmptyStream: () => R
    readonly CharStream: (char: string, stream: DocStream<A>) => R
    readonly TextStream: (text: string, stream: DocStream<A>) => R
    readonly LineStream: (indentation: number, stream: DocStream<A>) => R
    readonly PushAnnotationStream: (annotation: A, stream: DocStream<A>) => R
    readonly PopAnnotationStream: (stream: DocStream<A>) => R
  }
): R {
  switch (self._tag) {
    case "FailedStream":
      return patterns.FailedStream()
    case "EmptyStream":
      return patterns.EmptyStream()
    case "CharStream":
      return patterns.CharStream(self.char, self.stream)
    case "TextStream":
      return patterns.TextStream(self.text, self.stream)
    case "LineStream":
      return patterns.LineStream(self.indentation, self.stream)
    case "PushAnnotationStream":
      return patterns.PushAnnotationStream(self.annotation, self.stream)
    case "PopAnnotationStream":
      return patterns.PopAnnotationStream(self.stream)
  }
}

/**
 * @tsplus static ets/printer/DocStream/Aspects fold
 */
export const fold = Pipeable(fold_)
