/**
 * @tsplus static effect/printer/DocStream.Ops renderAnsi
 * @tsplus getter effect/printer/DocStream renderAnsi
 */
export function renderAnsi(self: DocStream<AnsiStyle>): string {
  return renderSafe(self, List.make(AnsiStyle.AssociativeIdentity.identity)).run
}

function unsafePeek(stack: List<AnsiStyle>): AnsiStyle {
  if (stack.isNil()) {
    throw new Error("bug, we ended up peeking at an empty stack!")
  }
  return stack.head
}

function unsafePop(stack: List<AnsiStyle>): Tuple<[AnsiStyle, List<AnsiStyle>]> {
  if (stack.isNil()) {
    throw new Error("bug, we ended up with an empty stack to pop from!")
  }
  return Tuple(stack.head, stack.tail)
}

function renderSafe(self: DocStream<AnsiStyle>, stack: List<AnsiStyle>): Eval<string> {
  switch (self._tag) {
    case "FailedStream": {
      throw new Error("bug, we ended up with a failed stream in render!")
    }
    case "EmptyStream": {
      return Eval.succeed("")
    }
    case "CharStream": {
      return Eval.suspend(renderSafe(self.stream, stack)).map((rest) => self.char + rest)
    }
    case "TextStream": {
      return Eval.suspend(renderSafe(self.stream, stack)).map((rest) => self.text + rest)
    }
    case "LineStream": {
      let indent = "\n"
      for (let i = 0; i < self.indentation; i++) {
        indent = indent += " "
      }
      return Eval.suspend(renderSafe(self.stream, stack)).map((rest) => indent + rest)
    }
    case "PushAnnotationStream": {
      const currentStyle = unsafePeek(stack)
      const nextStyle = AnsiStyle.AssociativeIdentity.combine(self.annotation, currentStyle)
      return Eval.suspend(renderSafe(self.stream, stack.prepend(self.annotation))).map((rest) =>
        AnsiStyle.Show.show(nextStyle) + rest
      )
    }
    case "PopAnnotationStream": {
      const { tuple: [, styles] } = unsafePop(stack)
      const nextStyle = unsafePeek(styles)
      return Eval.suspend(renderSafe(self.stream, styles)).map((rest) => AnsiStyle.Show.show(nextStyle) + rest)
    }
  }
}
