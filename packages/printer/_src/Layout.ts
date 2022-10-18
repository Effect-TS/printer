/**
 * @since 1.0.0
 */

import * as L from "@effect/printer/internal/Layout"
import type { Option } from "@fp-ts/data/Option"
import type { Predicate } from "@fp-ts/data/Predicate"

// -----------------------------------------------------------------------------
// Models
// -----------------------------------------------------------------------------

/**
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Layout
 */
export interface Layout<A> {
  (options: Layout.Options): DocStream<A>
}

/**
 * @since 1.0.0
 */
export declare namespace Layout {
  /**
   * Represents the options that will influence the layout algorithms.
   *
   * @category model
   * @since 1.0.0
   * @tsplus type effect/printer/Layout.Options
   */
  export interface Options {
    readonly pageWidth: PageWidth
  }

  /**
   * Decides whether a `DocStream` fits the given constraints, namely:
   * - original indentation of the current column
   * - initial indentation of the alternative `DocStream` if it starts with
   *   a line break (used by `layoutSmart`)
   * - width in which to fit the first line
   *
   * @category model
   * @since 1.0.0
   */
  export type FittingPredicate<A> = (
    lineIndent: number,
    currentColumn: number,
    initialIndentY: Option<number>
  ) => Predicate<DocStream<A>>
}

/**
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Layout.Ops
 */
export interface LayoutOps {
  readonly $: LayoutAspects
  readonly Options: LayoutOptionsOps
}

/**
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Layout.Options.Ops
 */
export interface LayoutOptionsOps {
  (pageWidth: PageWidth): Layout.Options
}
/**
 * @category constructors
 * @since 1.0.0
 * @tsplus static effect/printer/Layout.Ops Options
 */
export const LayoutOptions: LayoutOptionsOps = (pageWidth) => ({ pageWidth })

/**
 * @category instances
 * @since 1.0.0
 */
export const Layout: LayoutOps = {
  $: {},
  Options: LayoutOptions
}

/**
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Layout.Aspects
 */
export interface LayoutAspects {}

/**
 * The default layout options, which are suitable when you want to obtain output
 * but do not care about the details.
 *
 * @category constructors
 * @since 1.0.0
 * @tsplus static effect/printer/Layout.Options.Ops default
 */
export const defaultLayoutOptions = LayoutOptions(PageWidth.default)

// -----------------------------------------------------------------------------
// Layout Algorithms
// -----------------------------------------------------------------------------

/**
 * @category layout algorithms
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects layoutWadlerLeijen
 * @tsplus pipeable effect/printer/Doc layoutWadlerLeijen
 */
export const layoutWadlerLeijen: <A>(
  fits: Layout.FittingPredicate<A>,
  options: Layout.Options
) => (
  self: Doc<A>
) => DocStream<A> = L.layoutWadlerLeijen

/**
 * A layout algorithm which will lay out a document without adding any
 * indentation and without preserving annotations.
 *
 * Since no pretty-printing is involved, this layout algorithm is ver fast. The
 * resulting output contains fewer characters than a pretty-printed version and
 * can be used for output that is read by other programs.
 *
 * @exampleTodo
 * import { pipe } from "@effect-ts/core/Function"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const doc = pipe(
 *   D.vsep([
 *     D.text("lorem"),
 *     D.text("ipsum"),
 *     D.hang_(D.vsep([D.text("dolor"), D.text("sit")]), 4)
 *   ]),
 *   D.hang(4)
 * )
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem
 * //     ipsum
 * //     dolor
 * //         sit
 *
 * console.log(R.renderCompact(doc))
 * // lorem
 * // ipsum
 * // dolor
 * // sit
 * ```
 *
 * @category layout algorithms
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops layoutCompact
 * @tsplus getter effect/printer/Doc layoutCompact
 */
export const layoutCompact: <A>(self: Doc<A>) => DocStream<A> = L.layoutCompact

/**
 * The `layoutPretty` layout algorithm is the default algorithm for rendering
 * documents.
 *
 * `layoutPretty` commits to rendering something in a certain way if the next
 * element fits the layout constrants. In other words, it has one `DocStream`
 * element lookahead when rendering.
 *
 * Consider using the smarter, but slightly less performant `layoutSmart`
 * algorithm if the results seem to run off to the right before having lots of
 * line breaks.
 *
 * @tsplus static effect/printer/Doc.Aspects layoutPretty
 * @tsplus pipeable effect/printer/Doc layoutPretty
 */
export const layoutPretty: (
  options: Layout.Options
) => <A>(
  self: Doc<A>
) => DocStream<A> = L.layoutPretty

/**
 * A layout algorithm with more look ahead than `layoutPretty`, which will introduce
 * line breaks into a document earlier if the content does not, or will not, fit onto
 * one line.
 *
 * @exampleTodo
 * import * as A from "@effect-ts/core/Array"
 * import { flow, pipe } from "@effect-ts/core/Function"
 * import * as I from "@effect-ts/core/Identity"
 * import type { Doc } from "@effect-ts/printer/Core/Doc"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import type { Layout, LayoutOptions } from "@effect-ts/printer/Core/Layout"
 * import * as L from "@effect-ts/printer/Core/Layout"
 * import type { PageWidth } from "@effect-ts/printer/Core/PageWidth"
 * import * as PW from "@effect-ts/printer/Core/PageWidth"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * // Consider the following python-ish document:
 * const fun = <A>(doc: Doc<A>): Doc<A> =>
 *   D.hcat([D.hang_(D.hcat([D.text("fun("), D.softLineBreak, doc]), 2), D.text(")")])
 *
 * const funs = flow(fun, fun, fun, fun, fun)
 *
 * const doc = funs(D.align(D.list(D.words("abcdef ghijklm"))))
 *
 * // The document will be rendered using the following pipeline, where the choice
 * // of layout algorithm has been left open:
 * const pageWidth: PageWidth = PW.availablePerLine(26, 1)
 * const layoutOptions: LayoutOptions = L.layoutOptions(pageWidth)
 * const dashes = D.text(pipe(A.replicate_(26 - 2, "-"), I.fold(I.string)))
 * const hr = D.hcat([D.vbar, dashes, D.vbar])
 *
 * const render = <A>(doc: Doc<A>) => (
 *   layoutAlgorithm: (doc: Doc<A>) => Layout<A>
 * ): string => pipe(layoutOptions, layoutAlgorithm(D.vsep([hr, doc, hr])), R.render)
 *
 * // If rendered using `Layout.pretty`, with a page width of `26` characters per line,
 * // all the calls to `fun` will fit into the first line. However, this exceeds the
 * // desired `26` character page width.
 * console.log(pipe(L.pretty, render(doc)))
 * // |------------------------|
 * // fun(fun(fun(fun(fun(
 * //                   [ abcdef
 * //                   , ghijklm ])))))
 * // |------------------------|
 *
 * // The same document, rendered with `Layout.smart`, fits the layout contstraints:
 * console.log(pipe(L.smart, render(doc)))
 * // |------------------------|
 * // fun(
 * //   fun(
 * //     fun(
 * //       fun(
 * //         fun(
 * //           [ abcdef
 * //           , ghijklm ])))))
 * // |------------------------|
 *
 * // The key difference between `Layout.pretty` and `Layout.smart` is that the
 * // latter will check the potential document until it encounters a line with the
 * // same indentation or less than the start of the document. Any line encountered
 * // earlier is assumed to belong to the same syntactic structure. In contrast,
 * // `Layout.pretty` checks only the first line.
 *
 * // Consider for example the question of whether the `A`s fit into the document
 * // below:
 * // > 1 A
 * // > 2   A
 * // > 3  A
 * // > 4 B
 * // > 5   B
 *
 * // `Layout.layoutPretty` will check only the first line, ignoring whether the second line
 * // may already be too wide. In contrast, `Layout.smart` stops only once it reaches
 * // the fourth line 4, where the `B` has the same indentation as the first `A`.
 *
 * @category layout algorithms
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects layoutSmart
 * @tsplus pipeable effect/printer/Doc layoutSmart
 */
export const layoutSmart: (
  options: Layout.Options
) => <A>(
  self: Doc<A>
) => DocStream<A> = L.layoutSmart

/**
 * The `layoutUnbounded` layout algorithm will lay out a document an `Unbounded`
 * page width.
 *
 * @category layout algorithms
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops layoutUnbounded
 * @tsplus getter effect/printer/Doc layoutUnbounded
 */
export const layoutUnbounded: <A>(self: Doc<A>) => DocStream<A> = L.layoutUnbounded
