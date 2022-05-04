/**
 * The abstract data type `Doc` represents prettified documents that have been
 * annotated with data of type `A`.
 *
 * More specifically, a value of type `Doc` represents a non-empty set of
 * possible layouts for a given document. The layout algorithms select one of
 * these possibilities, taking into account variables such as the width of the
 * document.
 *
 * The annotation is an arbitrary piece of data associated with (part of) a
 * document. Annotations may be used by rendering algorithms to display
 * documents differently by providing information such as:
 * - color information (e.g., when rendering to the terminal)
 * - mouseover text (e.g., when rendering to rich HTML)
 * - whether to show something or not (to allow simple or detailed versions)
 *
 * @tsplus type ets/printer/Doc
 */
export type Doc<A> =
  | Fail<A>
  | Empty<A>
  | Char<A>
  | Text<A>
  | Line<A>
  | FlatAlt<A>
  | Cat<A>
  | Nest<A>
  | Union<A>
  | Column<A>
  | WithPageWidth<A>
  | Nesting<A>
  | Annotated<A>;

/**
 * @tsplus type ets/printer/Doc/Ops
 */
export interface DocOps {
  $: DocAspects;
}
export const Doc: DocOps = {
  $: {}
};

export interface DocF extends HKT {
  readonly type: Doc<this["A"]>;
}

/**
 * @tsplus type ets/printer/Doc/Aspects
 */
export interface DocAspects {}

/**
 * @tsplus unify ets/printer/Doc
 * @tsplus unify ets/printer/Doc/Fail
 * @tsplus unify ets/printer/Doc/Empty
 * @tsplus unify ets/printer/Doc/Char
 * @tsplus unify ets/printer/Doc/Text
 * @tsplus unify ets/printer/Doc/Line
 * @tsplus unify ets/printer/Doc/FlatAlt
 * @tsplus unify ets/printer/Doc/Cat
 * @tsplus unify ets/printer/Doc/Nest
 * @tsplus unify ets/printer/Doc/Union
 * @tsplus unify ets/printer/Doc/Column
 * @tsplus unify ets/printer/Doc/WithPageWidth
 * @tsplus unify ets/printer/Doc/Nesting
 * @tsplus unify ets/printer/Doc/Annotated
 */
export function unifyDoc<X extends Doc<any>>(
  self: X
): Doc<[X] extends [{ _A: () => infer A; }] ? A : never> {
  return self;
}

/**
 * Represents a document that cannot be rendered. Generally occurs when
 * flattening a line. The layout algorithms will reject this document and choose
 * a more suitable rendering.
 *
 * @tsplus type ets/printer/Doc/Fail
 */
export class Fail<A> {
  readonly _tag = "Fail";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents the empty document. Conceptually, the unit of `Cat`.
 *
 * @tsplus type ets/printer/Doc/Empty
 */
export class Empty<A> {
  readonly _tag = "Empty";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents a document containing a single character.
 *
 * **Invariants**
 * - Cannot be the newline (`"\n"`) character
 *
 * @tsplus type ets/printer/Doc/Char
 */
export class Char<A> {
  readonly _tag = "Char";
  readonly _A!: () => A;
  constructor(readonly char: string, readonly id: (_: never) => A) {}
}

/**
 * Represents a document containing a string of text.
 *
 * **Invariants**
 * - Text cannot be less than two characters long
 * - Text cannot contain a newline (`"\n"`) character
 *
 * @tsplus type ets/printer/Doc/Text
 */
export class Text<A> {
  readonly _tag = "Text";
  readonly _A!: () => A;
  constructor(readonly text: string, readonly id: (_: never) => A) {}
}

/**
 * Represents a document that contains a hard line break.
 *
 * @tsplus type ets/printer/Doc/Line
 */
export class Line<A> {
  readonly _tag = "Line";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents a flattened alternative of two documents. The layout algorithms
 * will choose the first document, but when flattened (via `group`) the second
 * document will be preferred.
 *
 * The layout algorithms operate under the assumption that the first alternative
 * is less wide than the flattened second alternative.
 *
 * @tsplus type ets/printer/Doc/FlatAlt
 */
export class FlatAlt<A> {
  readonly _tag = "FlatAlt";
  readonly _A!: () => A;
  constructor(readonly left: Doc<A>, readonly right: Doc<A>) {}
}

/**
 * Represents the concatenation of two documents.
 *
 * @tsplus type ets/printer/Doc/Cat
 */
export class Cat<A> {
  readonly _tag = "Cat";
  readonly _A!: () => A;
  constructor(readonly left: Doc<A>, readonly right: Doc<A>) {}
}

/**
 * Represents a document that is indented by a certain
 * number of columns.
 *
 * @tsplus type ets/printer/Doc/Nest
 */
export class Nest<A> {
  readonly _tag = "Nest";
  readonly _A!: () => A;
  constructor(readonly indent: number, readonly doc: Doc<A>) {}
}

/**
 * Represents the union of two documents. Used to implement layout alternatives
 * for `group`.
 *
 * **Invariants**
 * - The first lines of the first document should be longer than the first lines
 *   of the second document so that the layout algorithm can pick the document
 *   with the best fit.
 *
 * @tsplus type ets/printer/Doc/Union
 */
export class Union<A> {
  readonly _tag = "Union";
  readonly _A!: () => A;
  constructor(readonly left: Doc<A>, readonly right: Doc<A>) {}
}

/**
 * Represents a document that reacts to the current cursor position.
 *
 * @tsplus type ets/printer/Doc/Column
 */
export class Column<A> {
  readonly _tag = "Column";
  readonly _A!: () => A;
  constructor(readonly react: (position: number) => Doc<A>) {}
}

/**
 * Represents a document that reacts to the current page width.
 *
 * @tsplus type ets/printer/Doc/WithPageWidth
 */
export class WithPageWidth<A> {
  readonly _tag = "WithPageWidth";
  readonly _A!: () => A;
  constructor(readonly react: (pageWidth: PageWidth) => Doc<A>) {}
}

/**
 * Represents a document that reacts to the current nesting level.
 *
 * @tsplus type ets/printer/Doc/Nesting
 */
export class Nesting<A> {
  readonly _tag = "Nesting";
  readonly _A!: () => A;
  constructor(readonly react: (level: number) => Doc<A>) {}
}

/**
 * Represents a document with an associated annotation.
 *
 * @tsplus type ets/printer/Doc/Annotated
 */
export class Annotated<A> {
  readonly _tag = "Annotated";
  readonly _A!: () => A;
  constructor(readonly annotation: A, readonly doc: Doc<A>) {}
}

const line_: Doc<never> = new Line(identity);

/**
 * The `empty` document behaves like a document containing the empty string
 * (`""`), so it has a height of `1`.
 *
 * This may lead to surprising behavior if the empty document is expected to
 * bear no weight inside certain layout functions, such as`vcat`, where it will
 * render an empty line of output.
 *
 * ```typescript
 * import * as Doc from '@effect/printer/Doc'
 * import * as Render from '@effect/printer/Render'
 *
 * const doc = Doc.vsep([
 *   Doc.text('hello'),
 *   Doc.parens(D.empty), // `parens` for visibility purposes only
 *   Doc.text('world')
 * ])
 *
 * console.log(Render.renderPrettyDefault(doc))
 * // hello
 * // ()
 * // world
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops empty
 */
export const empty: Doc<never> = new Empty(identity);

/**
 * The `fail` document is a document that cannot be rendered.
 *
 * Generally occurs when flattening a line. The layout algorithms will reject
 * this document and choose a more suitable rendering.
 *
 * @tsplus static ets/printer/Doc/Ops fail
 */
export const fail: Doc<never> = new Fail(identity);

/**
 * A document containing a single character.
 *
 * **Invariants**
 * - Cannot be the newline (`"\n"`) character
 *
 * @tsplus static ets/printer/Doc/Ops char
 */
export function char(char: string): Doc<never> {
  return new Char(char, identity);
}

/**
 * A document containing a string of text.
 *
 * **Invariants**
 * - Text cannot be less than two characters long
 * - Text cannot contain a newline (`"\n"`) character
 *
 * @tsplus static ets/printer/Doc/Ops text
 */
export function text(text: string): Doc<never> {
  return new Text(text, identity);
}

/**
 * The `flatAlt` document will render `left` by default. However, when
 * `group`ed, `y` will be preferred with `left` as the fallback for cases where
 * `y` does not fit onto the page.
 *
 * **NOTE:**
 * Users should be careful to ensure that `left` is less wide than `right`.
 * Otherwise, if `right` ends up not fitting the page, then the layout
 * algorithms will fall back to an even wider layout.
 *
 * ```typescript
 * import type { Array } from '@effect-ts/core/Array'
 * import { pipe } from '@effect-ts/core/Function'
 * import type { Doc } from '@effect-ts/printer/Core/Doc'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const open = D.flatAlt_(D.empty, D.text('{ '))
 * const close = D.flatAlt_(D.empty, D.text(' }'))
 * const separator = D.flatAlt_(D.empty, D.text('; '))
 *
 * const prettyDo = <A>(xs: Array<Doc<A>>): Doc<A> =>
 *   D.group(D.hsep([D.text('do'), D.align(D.encloseSep_(xs, open, close, separator))]))
 *
 * const statements = [
 *   D.text('name:_ <- getArgs'),
 *   D.text('let greet = "Hello, " <> name"'),
 *   D.text('putStrLn greet')
 * ]
 *
 * // If it fits, then the content is put onto a single line with the `{;}` style
 * console.log(pipe(prettyDo(statements), R.renderPretty(80)))
 * // do { name:_ <- getArgs; let greet = "Hello, " <> name"; putStrLn greet }
 *
 * // When there is not enough space, the content is broken up onto multiple lines
 * console.log(pipe(prettyDo(statements), R.renderPretty(10)))
 * // do name:_ <- getArgs
 * //    let greet = "Hello, " <> name"
 * //    putStrLn greet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops flatAlt
 */
export function flatAlt<A, B>(left: Doc<A>, right: Doc<B>): Doc<A | B> {
  return new FlatAlt<A | B>(left, right);
}

/**
 * @tsplus static ets/printer/Doc/Ops union
 */
export function union<A, B>(left: Doc<A>, right: Doc<B>): Doc<A | B> {
  return new Union<A | B>(left, right);
}

/**
 * @tsplus static ets/printer/Doc/Ops cat
 */
export function cat<A, B>(left: Doc<A>, right: Doc<B>): Doc<A | B> {
  return new Cat<A | B>(left, right);
}

/**
 * The `line` document advances to the next line and indents to the current
 * nesting level. However, `line` will behave like `space` if the line break is
 * undone by `group`.
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat([
 *   D.text('lorem ipsum'),
 *   D.line,
 *   D.text('dolor sit amet')
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem ipsum
 * // dolor sit amet
 *
 * console.log(R.renderPrettyDefault(D.group(doc)))
 * // lorem ipsum dolor sit amet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops line
 */
export const line: Doc<never> = flatAlt(line_, char(" "));

/**
 * The `lineBreak` document is like `line` but behaves like `empty` if the line
 * break is undone by `group` (instead of `space`).
 *
 * ```typescript
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat([
 *   D.text('lorem ipsum'),
 *   D.lineBreak,
 *   D.text('dolor sit amet')
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem ipsum
 * // dolor sit amet
 *
 * console.log(R.renderPrettyDefault(D.group(doc)))
 * // lorem ipsumdolor sit amet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops lineBreak
 */
export const lineBreak: Doc<never> = flatAlt(line_, empty);

/**
 * The `softLine` document behaves like `space` if the resulting output fits
 * onto the page, otherwise it behaves like `line`.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * // Here we have enough space to put everything onto one line:
 * const doc = D.hcat([
 *   D.text('lorem ipsum'),
 *   D.softLine,
 *   D.text('dolor sit amet')
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(80)))
 * // lorem ipsum dolor sit amet
 *
 * // If the page width is narrowed to `10`, the layout algorithm will
 * // introduce a line break:
 * console.log(pipe(doc, R.renderPretty(10)))
 * // lorem ipsum
 * // dolor sit amet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops softLine
 */
export const softLine: Doc<never> = union(char(" "), line_);

/**
 * The `softLineBreak` document is similar to `softLine`, but behaves like
 * `empty` if the resulting output does not fit onto the page (instead of
 * `space`).
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * // With enough space, we get direct concatenation of documents:
 * const doc = D.hcat([
 *   D.text('ThisText'),
 *   D.softLineBreak,
 *   D.text('IsWayTooLong')
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(80)))
 * // ThisTextIsWayTooLong
 *
 * // If the page width is narrowed to `10`, the layout algorithm will
 * // introduce a line break:
 * console.log(pipe(doc, R.renderPretty(10)))
 * // ThisText
 * // IsWayTooLong
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops softLineBreak
 */
export const softLineBreak: Doc<never> = union(empty, line_);

/**
 * The `hardLine` document is always laid out as a line break, regardless of
 * space or whether or not the document was `group`'ed.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat([
 *   D.text('lorem ipsum'),
 *   D.hardLine,
 *   D.text('dolor sit amet')
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(1000)))
 * // lorem ipsum
 * // dolor sit amet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops hardLine
 */
export const hardLine: Doc<never> = line_;

/**
 * Lays out a document with the current nesting level (indentation
 * of the following lines) increased by the specified `indent`.
 * Negative values are allowed and will decrease the nesting level
 * accordingly.
 *
 * See also:
 * * `hang`: nest a document relative to the current cursor
 * position instead of the current nesting level
 * * `align`: set the nesting level to the current cursor
 * position
 * * `indent`: increase the indentation on the spot, padding
 * any empty space with spaces
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.vsep([
 *   D.nest_(D.vsep(D.words('lorem ipsum dolor')), 4),
 *   D.text('sit'),
 *   D.text('amet')
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem
 * //     ipsum
 * //     dolor
 * // sit
 * // amet
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops nest
 */
export function nest<A>(doc: Doc<A>, indent: number): Doc<A> {
  return indent === 0 ? doc : new Nest(indent, doc);
}

/**
 * Lays out a document depending upon the column at which the document starts.
 *
 * ```typescript
 * import * as A from '@effect-ts/core/Array'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * // Example 1:
 * const example1 = D.column((l) => D.hsep([D.text('Columns are'), D.text(`${l}-based.`)]))
 *
 * console.log(R.renderPrettyDefault(example1))
 * // Columns are 0-based.
 *
 * // Example 2:
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.column((l) => D.text(`| <- column ${l}`))
 * ])
 *
 * const example2 = D.vsep(A.map_([0, 4, 8], (n) => D.indent_(doc, n)))
 *
 * console.log(R.renderPrettyDefault(example2))
 * // prefix | <- column 7
 * //     prefix | <- column 11
 * //         prefix | <- column 15
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops column
 */
export function column<A>(react: (position: number) => Doc<A>): Doc<A> {
  return new Column(react);
}

/**
 * Lays out a document depending upon the current nesting level (i.e., the
 * current indentation of the document).
 *
 * ```typescript
 * import * as A from '@effect-ts/core/Array'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([D.text('prefix'), D.nesting((l) => D.brackets(D.text(`Nested: ${l}`)))])
 *
 * const example = D.vsep(A.map_([0, 4, 8], (n) => D.indent_(doc, n)))
 *
 * console.log(R.renderPrettyDefault(example))
 * // prefix [Nested: 0]
 * //     prefix [Nested: 4]
 * //         prefix [Nested: 8]
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops nesting
 */
export function nesting<A>(react: (level: number) => Doc<A>): Doc<A> {
  return new Nesting(react);
}

/**
 * Lays out a document according to the document's`PageWidth`.
 *
 * ```typescript
 * import { pipe } from '@effect-ts/core/Function'
 * import * as A from '@effect-ts/core/Array'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 * import * as PW from '@effect-ts/printer/Core/PageWidth'
 *
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.withPageWidth(
 *     PW.match({
 *       AvailablePerLine: (lw, rf) => D.brackets(D.text(`Width: ${lw}, Ribbon Fraction: ${rf}`)),
 *       Unbounded: () => D.empty
 *     })
 *   )
 * ])
 *
 * const example = D.vsep(A.map_([0, 4, 8], (n) => D.indent_(doc, n)))
 *
 * console.log(pipe(example, R.renderPretty(32)))
 * // prefix [Width: 32, Ribbon Fraction: 1]
 * //     prefix [Width: 32, Ribbon Fraction: 1]
 * //         prefix [Width: 32, Ribbon Fraction: 1]
 * ```
 *
 * @tsplus static ets/printer/Doc/Ops withPageWidth
 */
export function withPageWidth<A>(react: (pageWidth: PageWidth) => Doc<A>): Doc<A> {
  return new WithPageWidth(react);
}

/**
 * Adds an annotation to a `Doc`. The annotation can then be used by the rendering
 * algorithm to, for example, add color to certain parts of the output.
 *
 * **Note** This function is relevant only for custom formats with their own annotations,
 * and is not relevant for basic pretty printing.
 *
 * @tsplus fluent ets/printer/Doc annotate
 * @tsplus static ets/printer/Doc/Ops annotate
 */
export function annotate<A, B>(doc: Doc<B>, annotation: A): Doc<A | B> {
  return new Annotated<A | B>(annotation, doc);
}

/**
 * @tsplus static ets/printer/Doc/Ops isFail
 */
export function isFail<A>(doc: Doc<A>): doc is Fail<A> {
  return doc._tag === "Fail";
}

/**
 * @tsplus static ets/printer/Doc/Ops isEmpty
 */
export function isEmpty<A>(doc: Doc<A>): doc is Empty<A> {
  return doc._tag === "Empty";
}

/**
 * @tsplus static ets/printer/Doc/Ops isChar
 */
export function isChar<A>(doc: Doc<A>): doc is Char<A> {
  return doc._tag === "Char";
}

/**
 * @tsplus static ets/printer/Doc/Ops isText
 */
export function isText<A>(doc: Doc<A>): doc is Text<A> {
  return doc._tag === "Text";
}

/**
 * @tsplus static ets/printer/Doc/Ops isLine
 */
export function isLine<A>(doc: Doc<A>): doc is Line<A> {
  return doc._tag === "Line";
}

/**
 * @tsplus static ets/printer/Doc/Ops isFlatAlt
 */
export function isFlatAlt<A>(doc: Doc<A>): doc is FlatAlt<A> {
  return doc._tag === "FlatAlt";
}

/**
 * @tsplus static ets/printer/Doc/Ops isCat
 */
export function isCat<A>(doc: Doc<A>): doc is Cat<A> {
  return doc._tag === "Cat";
}

/**
 * @tsplus static ets/printer/Doc/Ops isNest
 */
export function isNest<A>(doc: Doc<A>): doc is Nest<A> {
  return doc._tag === "Nest";
}

/**
 * @tsplus static ets/printer/Doc/Ops isUnion
 */
export function isUnion<A>(doc: Doc<A>): doc is Union<A> {
  return doc._tag === "Union";
}

/**
 * @tsplus static ets/printer/Doc/Ops isColumn
 */
export function isColumn<A>(doc: Doc<A>): doc is Column<A> {
  return doc._tag === "Column";
}

/**
 * @tsplus static ets/printer/Doc/Ops isWithPageWidth
 */
export function isWithPageWidth<A>(doc: Doc<A>): doc is WithPageWidth<A> {
  return doc._tag === "WithPageWidth";
}

/**
 * @tsplus static ets/printer/Doc/Ops isNesting
 */
export function isNesting<A>(doc: Doc<A>): doc is Nesting<A> {
  return doc._tag === "Nesting";
}

/**
 * @tsplus static ets/printer/Doc/Ops isAnnotated
 */
export function isAnnotated<A>(doc: Doc<A>): doc is Annotated<A> {
  return doc._tag === "Annotated";
}
