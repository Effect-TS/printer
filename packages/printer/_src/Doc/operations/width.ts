/**
 * The `width` combinator makes the column width of a document available to the
 * document while rendering.
 *
 * ```typescript
 * import * as A from "@effect-ts/core/Array"
 * import { flow } from "@effect-ts/core/Function"
 * import type { Doc } from "@effect-ts/printer/Core/Doc"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const annotate: <A>(doc: Doc<A>) => Doc<A> = flow(
 *   D.brackets,
 *   D.width((w) => D.text(` <- width: ${w}`))
 * )
 *
 * const docs = [
 *   D.text("---"),
 *   D.text("------"),
 *   D.indent_(D.text("---"), 3),
 *   D.vsep([D.text("---"), D.indent_(D.text("---"), 4)])
 * ]
 *
 * const doc = D.align(D.vsep(A.map_(docs, annotate)))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // [---] <- width: 5
 * // [------] <- width: 8
 * // [   ---] <- width: 8
 * // [---
 * //     ---] <- width: 8
 * ```
 *
 * @tsplus static effect/printer/Doc.Aspects width
 * @tsplus pipeable effect/printer/Doc width
 */
export function width<A, B>(react: (width: number) => Doc<A>) {
  return (self: Doc<B>): Doc<A | B> =>
    Doc.column((colStart) =>
      Doc.cat(
        self,
        Doc.column((colEnd) => react(colEnd - colStart))
      )
    )
}
