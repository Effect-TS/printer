/**
 * The `layoutPretty` layout algorithm is the default algorithm for rendering
 * documents.
 *
 * `layoutPretty` commits to rendering something in a certain way if the next
 * element fits the layout constrants. In other words, it has one `DocStream`
 * element lookahead when rendering.
 *
 * Consider using the smarter, but slightly less performant `layoutSmart`
 * algorithm if the results seem to run off to the right before having lots of
 * line breaks.
 *
 * @tsplus static effect/printer/Doc.Aspects layoutPretty
 * @tsplus pipeable effect/printer/Doc layoutPretty
 */
export function layoutPretty(options: LayoutOptions) {
  return <A>(self: Doc<A>): DocStream<A> => {
    const pageWidth = options.pageWidth
    switch (pageWidth._tag) {
      case "AvailablePerLine": {
        return self.layoutWadlerLeijen(
          (lineIndent, currentColumn) =>
            (stream) => {
              const remainingWidth = PageWidth.remainingWidth(
                pageWidth.lineWidth,
                pageWidth.ribbonFraction,
                lineIndent,
                currentColumn
              )
              return fitsPretty(stream, remainingWidth)
            },
          options
        )
      }
      case "Unbounded": {
        return self.layoutUnbounded
      }
    }
  }
}

/**
 * @tsplus tailRec
 */
function fitsPretty<A>(self: DocStream<A>, w: number): boolean {
  if (w < 0) {
    return false
  }
  switch (self._tag) {
    case "FailedStream": {
      return false
    }
    case "EmptyStream": {
      return true
    }
    case "CharStream": {
      return fitsPretty(self.stream, w - 1)
    }
    case "TextStream": {
      return fitsPretty(self.stream, w - self.text.length)
    }
    case "LineStream": {
      return true
    }
    case "PushAnnotationStream": {
      return fitsPretty(self.stream, w)
    }
    case "PopAnnotationStream": {
      return fitsPretty(self.stream, w)
    }
  }
}
