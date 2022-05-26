/**
 * The `appendWithSpace` combinator concatenates two documents by placing a
 * `space` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSpace_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 * ```
 *
 * @tsplus fluent ets/printer/Doc appendWithSpace
 * @tsplus static ets/printer/Doc/Ops appendWithSpace
 */
export function appendWithSpace_<A>(self: Doc<A>, that: Doc<A>): Doc<A> {
  return Doc.cat(self, Doc.cat(Doc.space, that))
}

/**
 * The `appendWithSpace` combinator concatenates two documents by placing a
 * `space` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSpace_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects appendWithSpace
 */
export const appendWithSpace = Pipeable(appendWithSpace_)
