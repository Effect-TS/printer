/**
 * The `fill` combinator first lays out the document `x` and then appends
 * `space`s until the width of the document is equal to the specified `width`.
 * If the width of `x` is already larger than the specified `width`, nothing is
 * appended.
 *
 * ```typescript
 * import type { Array } from '@effect-ts/core/Array'
 * import * as A from '@effect-ts/core/Array'
 * import type { Doc } from '@effect-ts/printer/Core/Doc'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * type Signature = [name: string, type: string]
 *
 * const signatures: Array<Signature> = [
 *   ['empty', 'Doc'],
 *   ['nest', 'Int -> Doc -> Doc'],
 *   ['fillSep', '[Doc] -> Doc']
 * ]
 *
 * const prettySignature = <A>([name, type]: Signature): Doc<A> =>
 *   D.hsep([D.fill_(D.text(name), 5), D.text('::'), D.text(type)])
 *
 * const doc = D.hsep([
 *   D.text('let'),
 *   D.align(D.vcat(A.map_(signatures, prettySignature)))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // let empty :: Doc
 * //     nest  :: Int -> Doc -> Doc
 * //     fillSep :: [Doc] -> Doc
 * ```
 *
 * @tsplus fluent ets/printer/Doc fill
 */
export function fill_<A>(self: Doc<A>, width: number): Doc<A> {
  return self.width((w) => Doc.spaces(width - w));
}

/**
 * The `fill` combinator first lays out the document `x` and then appends
 * `space`s until the width of the document is equal to the specified `width`.
 * If the width of `x` is already larger than the specified `width`, nothing is
 * appended.
 *
 * ```typescript
 * import type { Array } from '@effect-ts/core/Array'
 * import * as A from '@effect-ts/core/Array'
 * import type { Doc } from '@effect-ts/printer/Core/Doc'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * type Signature = [name: string, type: string]
 *
 * const signatures: Array<Signature> = [
 *   ['empty', 'Doc'],
 *   ['nest', 'Int -> Doc -> Doc'],
 *   ['fillSep', '[Doc] -> Doc']
 * ]
 *
 * const prettySignature = <A>([name, type]: Signature): Doc<A> =>
 *   D.hsep([D.fill_(D.text(name), 5), D.text('::'), D.text(type)])
 *
 * const doc = D.hsep([
 *   D.text('let'),
 *   D.align(D.vcat(A.map_(signatures, prettySignature)))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // let empty :: Doc
 * //     nest  :: Int -> Doc -> Doc
 * //     fillSep :: [Doc] -> Doc
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects fill
 */
export const fill = Pipeable(fill_);
