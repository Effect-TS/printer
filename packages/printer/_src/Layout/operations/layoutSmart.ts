/**
 * A layout algorithm with more look ahead than `layoutPretty`, which will introduce
 * line breaks into a document earlier if the content does not, or will not, fit onto
 * one line.
 *
 * ```typescript
 * import * as A from "@effect-ts/core/Array"
 * import { flow, pipe } from "@effect-ts/core/Function"
 * import * as I from "@effect-ts/core/Identity"
 * import type { Doc } from "@effect-ts/printer/Core/Doc"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import type { Layout, LayoutOptions } from "@effect-ts/printer/Core/Layout"
 * import * as L from "@effect-ts/printer/Core/Layout"
 * import type { PageWidth } from "@effect-ts/printer/Core/PageWidth"
 * import * as PW from "@effect-ts/printer/Core/PageWidth"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * // Consider the following python-ish document:
 * const fun = <A>(doc: Doc<A>): Doc<A> =>
 *   D.hcat([D.hang_(D.hcat([D.text("fun("), D.softLineBreak, doc]), 2), D.text(")")])
 *
 * const funs = flow(fun, fun, fun, fun, fun)
 *
 * const doc = funs(D.align(D.list(D.words("abcdef ghijklm"))))
 *
 * // The document will be rendered using the following pipeline, where the choice
 * // of layout algorithm has been left open:
 * const pageWidth: PageWidth = PW.availablePerLine(26, 1)
 * const layoutOptions: LayoutOptions = L.layoutOptions(pageWidth)
 * const dashes = D.text(pipe(A.replicate_(26 - 2, "-"), I.fold(I.string)))
 * const hr = D.hcat([D.vbar, dashes, D.vbar])
 *
 * const render = <A>(doc: Doc<A>) => (
 *   layoutAlgorithm: (doc: Doc<A>) => Layout<A>
 * ): string => pipe(layoutOptions, layoutAlgorithm(D.vsep([hr, doc, hr])), R.render)
 *
 * // If rendered using `Layout.pretty`, with a page width of `26` characters per line,
 * // all the calls to `fun` will fit into the first line. However, this exceeds the
 * // desired `26` character page width.
 * console.log(pipe(L.pretty, render(doc)))
 * // |------------------------|
 * // fun(fun(fun(fun(fun(
 * //                   [ abcdef
 * //                   , ghijklm ])))))
 * // |------------------------|
 *
 * // The same document, rendered with `Layout.smart`, fits the layout contstraints:
 * console.log(pipe(L.smart, render(doc)))
 * // |------------------------|
 * // fun(
 * //   fun(
 * //     fun(
 * //       fun(
 * //         fun(
 * //           [ abcdef
 * //           , ghijklm ])))))
 * // |------------------------|
 *
 * // The key difference between `Layout.pretty` and `Layout.smart` is that the
 * // latter will check the potential document until it encounters a line with the
 * // same indentation or less than the start of the document. Any line encountered
 * // earlier is assumed to belong to the same syntactic structure. In contrast,
 * // `Layout.pretty` checks only the first line.
 *
 * // Consider for example the question of whether the `A`s fit into the document
 * // below:
 * // > 1 A
 * // > 2   A
 * // > 3  A
 * // > 4 B
 * // > 5   B
 *
 * // `Layout.pretty` will check only the first line, ignoring whether the second line
 * // may already be too wide. In contrast, `Layout.smart` stops only once it reaches
 * // the fourth line 4, where the `B` has the same indentation as the first `A`.
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects layoutSmart
 * @tsplus pipeable effect/printer/Doc layoutSmart
 */
export function layoutSmart(options: LayoutOptions) {
  return <A>(self: Doc<A>): DocStream<A> => {
    const pageWidth = options.pageWidth
    switch (pageWidth._tag) {
      case "AvailablePerLine": {
        return self.layoutWadlerLeijen(fitsSmart(pageWidth.lineWidth, pageWidth.ribbonFraction), options)
      }
      case "Unbounded": {
        return self.layoutUnbounded
      }
    }
  }
}

function fitsSmart(lineWidth: number, ribbonFraction: number) {
  return (lineIndent: number, currentColumn: number, initialIndentY: Maybe<number>) =>
    <A>(stream: DocStream<A>): boolean => {
      const availableWidth = PageWidth.remainingWidth(
        lineWidth,
        ribbonFraction,
        lineIndent,
        currentColumn
      )

      const minNestingLevel = initialIndentY.fold(
        // If `y` is `None`, then it is definitely not a hanging layout,
        // so we will need to check `x` with the same minNestingLevel
        // that any subsequent lines with the same indentation use
        currentColumn,
        // If `y` is some, then `y` could be a (less wide) hanging layout,
        // so we need to check `x` a bit more thoroughly to make sure we
        // do not miss a potentially better fitting `y`
        (i) => Math.min(i, currentColumn)
      )

      return fitsSmartLoop(stream, availableWidth, minNestingLevel, lineWidth)
    }
}

/**
 * @tsplus tailRec
 */
function fitsSmartLoop<A>(
  self: DocStream<A>,
  w: number,
  minNestingLevel: number,
  lineWidth: number
): boolean {
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
      return fitsSmartLoop(self.stream, w - 1, minNestingLevel, lineWidth)
    }
    case "TextStream": {
      return fitsSmartLoop(self.stream, w - self.text.length, minNestingLevel, lineWidth)
    }
    case "LineStream": {
      if (minNestingLevel >= self.indentation) {
        return true
      }
      return fitsSmartLoop(self.stream, lineWidth - self.indentation, minNestingLevel, lineWidth)
    }
    case "PushAnnotationStream": {
      return fitsSmartLoop(self.stream, w, minNestingLevel, lineWidth)
    }
    case "PopAnnotationStream":
      return fitsSmartLoop(self.stream, w, minNestingLevel, lineWidth)
  }
}
