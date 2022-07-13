/**
 * The `concatWith` combinator concatenates all documents in a collection
 * element-wise with the specified binary function.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = pipe(
 *   [D.char('a'), D.char('b')],
 *   D.concatWith(D.appendWithSpace_)
 * )
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 * ```
 *
 * @tsplus static effect/printer/Doc.Ops concatWith
 */
export function concatWith<A>(
  docs: Collection<Doc<A>>,
  f: (x: Doc<A>, y: Doc<A>) => Doc<A>
): Doc<A> {
  const docs0 = Array.from(docs)
  if (docs0.length === 0) {
    return Doc.empty
  }
  const head = docs0[0]!
  const tail = docs0.slice(1)
  return tail.reduce((acc, curr) => f(acc, curr), head)
}
