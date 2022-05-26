/**
 * Splits a string of words into individual `Text` documents using the specified
 * `char` to split on (defaults to `' '`). In addition, a `softLine` is inserted
 * in between each word so that if the text exceeds the available width it will
 * be broken into multiple lines.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 *
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.reflow(
 *   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
 *     'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
 * )
 *
 * console.log(pipe(doc, R.renderPretty(32)))
 * // Lorem ipsum dolor sit amet,
 * // consectetur adipisicing elit,
 * // sed do eiusmod tempor incididunt
 * // ut labore et dolore magna
 * // aliqua.
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops reflow
 */
export function reflow(s: string, char = " "): Doc<never> {
  return Doc.fillSep(Doc.words(s, char))
}
