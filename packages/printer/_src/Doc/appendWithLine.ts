/**
 * The `appendWithLine` combinator concatenates two documents by placing a
 * `line` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a
 * // b
 * ```
 *
 * @tsplus fluent ets/printer/Doc appendWithLine
 */
export function appendWithLine_<A>(self: Doc<A>, that: Doc<A>): Doc<A> {
  return Doc.cat(self, Doc.cat(Doc.line, that));
}

/**
 * The `appendWithLine` combinator concatenates two documents by placing a
 * `line` document between them.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a
 * // b
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects appendWithLine
 */
export const appendWithLine = Pipeable(appendWithLine_);
