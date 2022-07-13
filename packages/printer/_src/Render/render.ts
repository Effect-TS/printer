/**
 * @tsplus static effect/printer/DocStream.Ops render
 * @tsplus getter effect/printer/DocStream render
 */
export function render<A>(self: DocStream<A>): string {
  return renderSafe(self).run
}

function renderSafe<A>(self: DocStream<A>): Eval<string> {
  switch (self._tag) {
    case "FailedStream": {
      throw new Error("bug, we ended up with a failed in render!")
    }
    case "EmptyStream": {
      return Eval.succeed("")
    }
    case "CharStream": {
      return Eval.suspend(renderSafe(self.stream)).map((rest) => self.char + rest)
    }
    case "TextStream": {
      return Eval.suspend(renderSafe(self.stream)).map((rest) => self.text + rest)
    }
    case "LineStream": {
      let indent = "\n"
      for (let i = 0; i < self.indentation; i++) {
        indent = indent += " "
      }
      return Eval.suspend(renderSafe(self.stream)).map((rest) => indent + rest)
    }
    case "PopAnnotationStream":
    case "PushAnnotationStream": {
      return Eval.suspend(renderSafe(self.stream))
    }
  }
}
