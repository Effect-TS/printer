/**
 * The `appendWithSoftLine` combinator concatenates two documents by placing a
 * `softLine` document between them.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSoftLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 *
 * console.log(pipe(doc, R.renderPretty(1)))
 * // a
 * // b
 * ```
 *
 * @tsplus fluent ets/printer/Doc appendWithSoftLine
 * @tsplus static ets/printer/Doc/Ops appendWithSoftLine
 */
export function appendWithSoftLine_<A>(self: Doc<A>, that: Doc<A>): Doc<A> {
  return Doc.cat(self, Doc.cat(Doc.softLine, that));
}

/**
 * The `appendWithSoftLine` combinator concatenates two documents by placing a
 * `softLine` document between them.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSoftLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 *
 * console.log(pipe(doc, R.renderPretty(1)))
 * // a
 * // b
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects appendWithSoftLine
 */
export const appendWithSoftLine = Pipeable(appendWithSoftLine_);
