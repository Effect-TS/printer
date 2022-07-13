/**
 * A layout algorithm which will lay out a document without adding any
 * indentation and without preserving annotations.
 *
 * Since no pretty-printing is involved, this layout algorithm is ver fast. The
 * resulting output contains fewer characters than a pretty-printed version and
 * can be used for output that is read by other programs.
 *
 * ```typescript
 * import { pipe } from "@effect-ts/core/Function"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const doc = pipe(
 *   D.vsep([
 *     D.text("lorem"),
 *     D.text("ipsum"),
 *     D.hang_(D.vsep([D.text("dolor"), D.text("sit")]), 4)
 *   ]),
 *   D.hang(4)
 * )
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem
 * //     ipsum
 * //     dolor
 * //         sit
 *
 * console.log(R.renderCompact(doc))
 * // lorem
 * // ipsum
 * // dolor
 * // sit
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops layoutCompact
 * @tsplus getter effect/printer/Doc layoutCompact
 */
export function layoutCompact<A>(self: Doc<A>): DocStream<A> {
  return compactSafe(Chunk.single(self), 0).run
}

function compactSafe<A>(docs: Chunk<Doc<A>>, i: number): Eval<DocStream<A>> {
  if (docs.isEmpty) {
    return Eval.succeed(DocStream.empty)
  }
  const head = docs.unsafeGet(0)
  const rest = docs.unsafeTail
  switch (head._tag) {
    case "Fail": {
      return Eval.succeed(DocStream.failed)
    }
    case "Empty":
      return Eval.suspend(compactSafe(rest, i))
    case "Char": {
      return Eval.suspend(compactSafe(rest, i + 1)).map((stream) => DocStream.char(stream, head.char))
    }
    case "Text": {
      return Eval.suspend(compactSafe(rest, i + head.text.length)).map((stream) => DocStream.text(stream, head.text))
    }
    case "Line": {
      return Eval.suspend(compactSafe(rest, 0)).map((stream) => DocStream.line(stream, 0))
    }
    case "FlatAlt": {
      return Eval.suspend(compactSafe(rest.prepend(head.left), i))
    }
    case "Cat": {
      return Eval.suspend(compactSafe(rest.prepend(head.right).prepend(head.left), i))
    }
    case "Nest": {
      return Eval.suspend(compactSafe(rest.prepend(head.doc), i))
    }
    case "Union": {
      return Eval.suspend(compactSafe(rest.prepend(head.right), i))
    }
    case "Column": {
      return Eval.suspend(compactSafe(rest.prepend(head.react(i)), i))
    }
    case "WithPageWidth": {
      return Eval.suspend(compactSafe(rest.prepend(head.react(PageWidth.Unbounded)), i))
    }
    case "Nesting": {
      return Eval.suspend(compactSafe(rest.prepend(head.react(0)), i))
    }
    case "Annotated": {
      return Eval.suspend(compactSafe(rest.prepend(head.doc), i))
    }
  }
}
