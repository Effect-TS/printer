/**
 * A Haskell-inspired variant of `encloseSep` that uses a comma as the separator
 * and parentheses as the enclosure for a collection of documents.
 *
 * ```typescript
 * import * as A from "@effect-ts/core/Array"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const doc = D.tupled(
 *   A.map_(["1", "20", "300", "4000"], (n) => (n.length === 1 ? D.char(n) : D.text(n)))
 * )
 *
 * console.log(R.renderPrettyDefault(doc))
 * // (1, 20, 300, 4000)
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops tupled
 */
export function tupled<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.encloseSep(
    docs,
    Doc.flatAlt(Doc.text("( "), Doc.lparen),
    Doc.flatAlt(Doc.text(" )"), Doc.rparen),
    Doc.text(", ")
  ).group()
}
