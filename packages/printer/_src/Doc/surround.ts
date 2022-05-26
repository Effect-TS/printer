/**
 * The `enclose` combinator encloses a document `x` in between `left` and
 * `right` documents.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = pipe(D.char('-'), D.enclose(D.char('A'), D.char('Z')))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // A-Z
 * ```
 *
 * @tsplus fluent ets/printer/Doc surround
 */
export function surround_<A, B, C>(
  self: Doc<A>,
  left: Doc<B>,
  right: Doc<C>
): Doc<A | B | C> {
  return Doc.cat(left, Doc.cat(self, right))
}

/**
 * The `enclose` combinator encloses a document `x` in between `left` and
 * `right` documents.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = pipe(D.char('-'), D.enclose(D.char('A'), D.char('Z')))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // A-Z
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects surround
 */
export const surround = Pipeable(surround_)
