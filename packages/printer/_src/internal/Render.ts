import { pipe } from "@fp-ts/data/Function"
import * as SafeEval from "@fp-ts/data/SafeEval"

// -----------------------------------------------------------------------------
// Rendering Algorithms
// -----------------------------------------------------------------------------

/** @internal */
export function render<A>(self: DocStream<A>): string {
  return SafeEval.execute(renderSafe(self))
}

function renderSafe<A>(self: DocStream<A>): SafeEval.SafeEval<string> {
  switch (self._tag) {
    case "FailedStream": {
      throw new Error("bug, we ended up with a failed in render!")
    }
    case "EmptyStream": {
      return SafeEval.succeed("")
    }
    case "CharStream": {
      return pipe(
        SafeEval.suspend(() => renderSafe(self.stream)),
        SafeEval.map((rest) => self.char + rest)
      )
    }
    case "TextStream": {
      return pipe(
        SafeEval.suspend(() => renderSafe(self.stream)),
        SafeEval.map((rest) => self.text + rest)
      )
    }
    case "LineStream": {
      let indent = "\n"
      for (let i = 0; i < self.indentation; i++) {
        indent = indent += " "
      }
      return pipe(
        SafeEval.suspend(() => renderSafe(self.stream)),
        SafeEval.map((rest) => indent + rest)
      )
    }
    case "PopAnnotationStream":
    case "PushAnnotationStream": {
      return SafeEval.suspend(() => renderSafe(self.stream))
    }
  }
}

/** @internal */
export function renderCompact<A>(self: Doc<A>): string {
  return self.layoutCompact.render
}

/** @internal */
export function renderPretty(lineWidth: number, ribbonFraction = 1) {
  return <A>(self: Doc<A>): string => {
    const pageWidth = PageWidth.AvailablePerLine(lineWidth, ribbonFraction)
    const options = Layout.Options(pageWidth)
    return self.layoutPretty(options).render
  }
}

/** @internal */
export function renderPrettyDefault<A>(self: Doc<A>): string {
  return self.layoutPretty(Layout.Options.default).render
}

/** @internal */
export function renderPrettyUnbounded<A>(self: Doc<A>): string {
  return self.layoutPretty(Layout.Options(PageWidth.Unbounded)).render
}

/** @internal */
export function renderSmart<A>(lineWidth: number, ribbonFraction = 1) {
  return (self: Doc<A>): string => {
    const pageWidth = PageWidth.AvailablePerLine(lineWidth, ribbonFraction)
    const options = Layout.Options(pageWidth)
    return self.layoutSmart(options).render
  }
}

/** @internal */
export function renderSmartDefault<A>(self: Doc<A>): string {
  return self.layoutSmart(Layout.Options.default).render
}

/** @internal */
export function renderSmartUnbounded<A>(self: Doc<A>): string {
  return self.layoutSmart(Layout.Options(PageWidth.Unbounded)).render
}
