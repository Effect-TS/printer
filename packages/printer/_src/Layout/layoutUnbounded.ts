/**
 * The `layoutUnbounded` layout algorithm will lay out a document an `Unbounded`
 * page width.
 *
 * @tsplus fluent ets/printer/Doc layoutUnbounded
 */
export function layoutUnbounded<A>(self: Doc<A>): DocStream<A> {
  return self.layoutWadlerLeijen<A>(
    () => (stream) => !failsOnFirstLine(stream),
    LayoutOptions(PageWidth.Unbounded)
  );
}

/**
 * @tsplus tailRec
 */
function failsOnFirstLine<A>(self: DocStream<A>): boolean {
  switch (self._tag) {
    case "FailedStream":
      return true;
    case "EmptyStream":
      return false;
    case "CharStream":
      return failsOnFirstLine(self.stream);
    case "TextStream":
      return failsOnFirstLine(self.stream);
    case "LineStream":
      return false;
    case "PushAnnotationStream":
      return failsOnFirstLine(self.stream);
    case "PopAnnotationStream":
      return failsOnFirstLine(self.stream);
  }
}
