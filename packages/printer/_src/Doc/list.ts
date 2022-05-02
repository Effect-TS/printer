/**
 * A Haskell-inspired variant of `encloseSep` that uses a comma as the separator
 * and braces as the enclosure for a collection of documents.
 *
 * ```typescript
 * import * as A from "@effect-ts/core/Array"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const doc = D.list(
 *   A.map_(["1", "20", "300", "4000"], (n) => (n.length === 1 ? D.char(n) : D.text(n)))
 * )
 *
 * console.log(R.renderPrettyDefault(doc))
 * // [1, 20, 300, 4000]
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops list
 */
export function list<A>(docs: Collection<Doc<A>>): Doc<A> {
  return Doc.encloseSep(
    docs,
    Doc.flatAlt(Doc.text("[ "), Doc.lbracket),
    Doc.flatAlt(Doc.text(" ]"), Doc.rbracket),
    Doc.text(", ")
  ).group();
}
