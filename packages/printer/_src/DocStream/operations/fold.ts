/**
 * @tsplus static effect/printer/DocStream.Aspects fold
 * @tsplus pipeable effect/printer/DocStream fold
 */
export function fold<A, R>(
  patterns: {
    readonly FailedStream: () => R
    readonly EmptyStream: () => R
    readonly CharStream: (char: string, stream: DocStream<A>) => R
    readonly TextStream: (text: string, stream: DocStream<A>) => R
    readonly LineStream: (indentation: number, stream: DocStream<A>) => R
    readonly PushAnnotationStream: (annotation: A, stream: DocStream<A>) => R
    readonly PopAnnotationStream: (stream: DocStream<A>) => R
  }
) {
  return (self: DocStream<A>): R => {
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
}
