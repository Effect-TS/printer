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
 * @since 1.0.0
 */

import * as D from "@effect/printer/internal/Doc"
import type { Functor as _Functor } from "@fp-ts/core/Functor"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import type { Semigroup } from "@fp-ts/core/Semigroup"

// -----------------------------------------------------------------------------
// Models
// -----------------------------------------------------------------------------

const TypeId: unique symbol = D.DocTypeId as TypeId

/**
 * @category symbol
 * @since 1.0.0
 */
export type TypeId = typeof TypeId

/**
 * Represents a prettified document that has been annotated with data of type
 * `A`.
 *
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Doc
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
  | Annotated<A>

/**
 * @since 1.0.0
 */
export declare namespace Doc {
  export type TypeLambda = DocTypeLambda
}

/**
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Doc.Ops
 */
export interface DocOps {
  $: DocAspects
}
/**
 * @category instances
 * @since 1.0.0
 */
export const Doc: DocOps = {
  $: {}
}

/**
 * @category model
 * @since 1.0.0
 */
export interface DocTypeLambda extends TypeLambda {
  readonly type: Doc<this["Out1"]>
}

/**
 * @category model
 * @since 1.0.0
 * @tsplus type effect/printer/Doc.Aspects
 */
export interface DocAspects {}

/**
 * Represents a document that cannot be rendered. Generally occurs when
 * flattening a line. The layout algorithms will reject this document and choose
 * a more suitable rendering.
 *
 * @category model
 * @since 1.0.0
 */
export interface Fail<A> {
  readonly _tag: "Fail"
  readonly _id: TypeId
  readonly _A: (_: never) => A
}

/**
 * Represents the empty document.
 *
 * Conceptually, the `Empty` document can be thought of as the unit of `Cat`.
 *
 * @category model
 * @since 1.0.0
 */
export interface Empty<A> {
  readonly _tag: "Empty"
  readonly _id: TypeId
  readonly _A: (_: never) => A
}

/**
 * Represents a document containing a single character.
 *
 * **Invariants**
 * - Cannot be the newline (`"\n"`) character
 *
 * @category model
 * @since 1.0.0
 */
export interface Char<A> {
  readonly _tag: "Char"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly char: string
}

/**
 * Represents a document containing a string of text.
 *
 * **Invariants**
 * - Text cannot be less than two characters long
 * - Text cannot contain a newline (`"\n"`) character
 *
 * @category model
 * @since 1.0.0
 */
export interface Text<A> {
  readonly _tag: "Text"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly text: string
}

/**
 * Represents a document that contains a hard line break.
 *
 * @category model
 * @since 1.0.0
 */
export interface Line<A> {
  readonly _tag: "Line"
  readonly _id: TypeId
  readonly _A: (_: never) => A
}

/**
 * Represents a flattened alternative of two documents. The layout algorithms
 * will choose the first document, but when flattened (via `group`) the second
 * document will be preferred.
 *
 * The layout algorithms operate under the assumption that the first alternative
 * is less wide than the flattened second alternative.
 *
 * @category model
 * @since 1.0.0
 */
export interface FlatAlt<A> {
  readonly _tag: "FlatAlt"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly left: Doc<A>
  readonly right: Doc<A>
}

/**
 * Represents the concatenation of two documents.
 *
 * @category model
 * @since 1.0.0
 */
export interface Cat<A> {
  readonly _tag: "Cat"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly left: Doc<A>
  readonly right: Doc<A>
}

/**
 * Represents a document that is indented by a certain number of columns.
 *
 * @category model
 * @since 1.0.0
 */
export interface Nest<A> {
  readonly _tag: "Nest"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly indent: number
  readonly doc: Doc<A>
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
 * @category model
 * @since 1.0.0
 */
export interface Union<A> {
  readonly _tag: "Union"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly left: Doc<A>
  readonly right: Doc<A>
}

/**
 * Represents a document that reacts to the current cursor position.
 *
 * @category model
 * @since 1.0.0
 */
export interface Column<A> {
  readonly _tag: "Column"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly react: (position: number) => Doc<A>
}

/**
 * Represents a document that reacts to the current page width.
 *
 * @category model
 * @since 1.0.0
 */
export interface WithPageWidth<A> {
  readonly _tag: "WithPageWidth"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly react: (pageWidth: PageWidth) => Doc<A>
}

/**
 * Represents a document that reacts to the current page width.
 *
 * @category model
 * @since 1.0.0
 */
export interface WithPageWidth<A> {
  readonly _tag: "WithPageWidth"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly react: (pageWidth: PageWidth) => Doc<A>
}

/**
 * Represents a document that reacts to the current nesting level.
 *
 * @category model
 * @since 1.0.0
 */
export interface Nesting<A> {
  readonly _tag: "Nesting"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly react: (level: number) => Doc<A>
}

/**
 * Represents a document with an associated annotation.
 *
 * @category model
 * @since 1.0.0
 */
export interface Annotated<A> {
  readonly _tag: "Annotated"
  readonly _id: TypeId
  readonly _A: (_: never) => A
  readonly annotation: A
  readonly doc: Doc<A>
}

// -----------------------------------------------------------------------------
// Refinements
// -----------------------------------------------------------------------------

/**
 * Returns `true` if the specified value is a `Doc`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isDoc
 */
export const isDoc: (u: unknown) => u is Doc<unknown> = D.isDoc

/**
 * Returns `true` if the specified `Doc` is a `Fail`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isFail
 * @tsplus fluent effect/printer/Doc isFail
 */
export const isFail: <A>(self: Doc<A>) => self is Fail<A> = D.isFail

/**
 * Returns `true` if the specified `Doc` is an `Empty`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isEmpty
 * @tsplus fluent effect/printer/Doc isEmpty
 */
export const isEmpty: <A>(self: Doc<A>) => self is Empty<A> = D.isEmpty

/**
 * Returns `true` if the specified `Doc` is a `Char`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isChar
 * @tsplus fluent effect/printer/Doc isChar
 */
export const isChar: <A>(self: Doc<A>) => self is Char<A> = D.isChar

/**
 * Returns `true` if the specified `Doc` is a `Text`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isText
 * @tsplus fluent effect/printer/Doc isText
 */
export const isText: <A>(self: Doc<A>) => self is Text<A> = D.isText

/**
 * Returns `true` if the specified `Doc` is a `Line`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isLine
 * @tsplus fluent effect/printer/Doc isLine
 */
export const isLine: <A>(self: Doc<A>) => self is Line<A> = D.isLine

/**
 * Returns `true` if the specified `Doc` is a `FlatAlt`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isFlatAlt
 * @tsplus fluent effect/printer/Doc isFlatAlt
 */
export const isFlatAlt: <A>(self: Doc<A>) => self is FlatAlt<A> = D.isFlatAlt

/**
 * Returns `true` if the specified `Doc` is a `Cat`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isCat
 * @tsplus fluent effect/printer/Doc isCat
 */
export const isCat: <A>(self: Doc<A>) => self is Cat<A> = D.isCat

/**
 * Returns `true` if the specified `Doc` is a `Nest`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isNest
 * @tsplus fluent effect/printer/Doc isNest
 */
export const isNest: <A>(self: Doc<A>) => self is Nest<A> = D.isNest

/**
 * Returns `true` if the specified `Doc` is a `Union`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isUnion
 * @tsplus fluent effect/printer/Doc isUnion
 */
export const isUnion: <A>(self: Doc<A>) => self is Union<A> = D.isUnion

/**
 * Returns `true` if the specified `Doc` is a `Column`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isColumn
 * @tsplus fluent effect/printer/Doc isColumn
 */
export const isColumn: <A>(self: Doc<A>) => self is Column<A> = D.isColumn

/**
 * Returns `true` if the specified `Doc` is a `WithPageWidth`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isWithPageWidth
 * @tsplus fluent effect/printer/Doc isWithPageWidth
 */
export const isWithPageWidth = D.isWithPageWidth

/**
 * Returns `true` if the specified `Doc` is a `Nesting`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isNesting
 * @tsplus fluent effect/printer/Doc isNesting
 */
export const isNesting: <A>(self: Doc<A>) => self is Nesting<A> = D.isNesting

/**
 * Returns `true` if the specified `Doc` is a `Annotated`, `false` otherwise.
 *
 * @category refinements
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops isAnnotated
 * @tsplus fluent effect/printer/Doc isAnnotated
 */
export const isAnnotated: <A>(self: Doc<A>) => self is Annotated<A> = D.isAnnotated

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * A document containing a single character.
 *
 * **Invariants**
 * - Cannot be the newline (`"\n"`) character
 *
 * @category constructors
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops char
 */
export const char: (char: string) => Doc<never> = D.char

/**
 * A document containing a string of text.
 *
 * **Invariants**
 * - Text cannot be less than two characters long
 * - Text cannot contain a newline (`"\n"`) character
 *
 * @category constructors
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops text
 */
export const text: (text: string) => Doc<never> = D.text

/**
 * Constructs a document containing a string of text.
 *
 * **Note**: newline characters (`\n`) contained in the provided string will be
 * disregarded (i.e. not rendered) in the output document.
 *
 * @category constructors
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops string
 */
export const string: (str: string) => Doc<never> = D.string

// -----------------------------------------------------------------------------
// Primitives
// -----------------------------------------------------------------------------

/**
 * The `empty` document behaves like a document containing the empty string
 * (`""`), so it has a height of `1`.
 *
 * This may lead to surprising behavior if the empty document is expected to
 * bear no weight inside certain layout functions, such as`vcat`, where it will
 * render an empty line of output.
 *
 * @example
 * import * as Doc from "@effect/printer/Doc"
 * import * as Render from "@effect/printer/Render"
 * import * as String from "@fp-ts/data/String"
 * import * as assert from "assert"
 *
 * const doc = Doc.vsep([
 *   Doc.text("hello"),
 *   Doc.parens(D.empty), // `parens` for visibility purposes only
 *   Doc.text("world")
 * ])
 *
 * const expected = `|hello
 *                   |()
 *                   |world`
 *
 * assert.strictEqual(
 *   Render.renderPrettyDefault(doc),
 *   String.stripMargin(expected)
 * )
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops empty
 */
export const empty: Doc<never> = D.empty

/**
 * The `fail` document is a document that cannot be rendered.
 *
 * Generally occurs when flattening a line. The layout algorithms will reject
 * this document and choose a more suitable rendering.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops fail
 */
export const fail: Doc<never> = D.fail

/**
 * The `line` document advances to the next line and indents to the current
 * nesting level. However, `line` will behave like `space` if the line break is
 * undone by `group`.
 *
 * @exampleTodo
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
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops line
 */
export const line: Doc<never> = D.line

/**
 * The `lineBreak` document is like `line` but behaves like `empty` if the line
 * break is undone by `group` (instead of `space`).
 *
 * @exampleTodo
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
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops lineBreak
 */
export const lineBreak: Doc<never> = D.lineBreak

/**
 * The `softLine` document behaves like `space` if the resulting output fits
 * onto the page, otherwise it behaves like `line`.
 *
 * @exampleTodo
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
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops softLine
 */
export const softLine: Doc<never> = D.softLine

/**
 * The `softLineBreak` document is similar to `softLine`, but behaves like
 * `empty` if the resulting output does not fit onto the page (instead of
 * `space`).
 *
 * @exampleTodo
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
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops softLineBreak
 */
export const softLineBreak: Doc<never> = D.softLineBreak

/**
 * The `hardLine` document is always laid out as a line break, regardless of
 * space or whether or not the document was `group`'ed.
 *
 * @exampleTodo
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
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops hardLine
 */
export const hardLine: Doc<never> = D.hardLine

/**
 * A document containing a single `\` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops backslash
 */
export const backslash: Doc<never> = D.backslash

/**
 * A document containing a single `:` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops colon
 */
export const colon: Doc<never> = D.colon

/**
 * A document containing a single `,` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops comma
 */
export const comma: Doc<never> = D.comma

/**
 * A document containing a single `.` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops dot
 */
export const dot: Doc<never> = D.dot

/**
 * A document containing a single `"` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops dquote
 */
export const dquote: Doc<never> = D.dquote

/**
 * A document containing a single `=` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops equalSign
 */
export const equalSign: Doc<never> = D.equalSign

/**
 * A document containing a single `<` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops langle
 */
export const langle: Doc<never> = D.langle

/**
 * A document containing a single `{` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops lbrace
 */
export const lbrace: Doc<never> = D.lbrace

/**
 * A document containing a single `[` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops lbracket
 */
export const lbracket: Doc<never> = D.lbracket

/**
 * A document containing a single `(` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops lparen
 */
export const lparen: Doc<never> = D.lparen

/**
 * A document containing a single `>` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops rangle
 */
export const rangle: Doc<never> = D.rangle

/**
 * A document containing a single `}` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops rbrace
 */
export const rbrace: Doc<never> = D.rbrace

/**
 * A document containing a single `]` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops rbracket
 */
export const rbracket: Doc<never> = D.rbracket

/**
 * A document containing a single `)` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops rparen
 */
export const rparen: Doc<never> = D.rparen

/**
 * A document containing a single `;` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops semi
 */
export const semi: Doc<never> = D.semi

/**
 * A document containing a single `/` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops slash
 */
export const slash: Doc<never> = D.slash

/**
 * A document containing a single `'` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops squote
 */
export const squote: Doc<never> = D.squote

/**
 * A document containing a single ` ` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops space
 */
export const space: Doc<never> = D.space

/**
 * A document containing a single `|` character.
 *
 * @category primitives
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops vbar
 */
export const vbar: Doc<never> = D.vbar

// -----------------------------------------------------------------------------
// Concatenation
// -----------------------------------------------------------------------------

/**
 * The `cat` combinator lays out two documents separated by nothing.
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus pipeable effect/printer/Doc cat
 */
export const cat: <B>(that: Doc<B>) => <A>(self: Doc<A>) => Doc<B | A> = D.cat

/**
 * The `cats` combinator will attempt to lay out a collection of documents
 * separated by nothing. If the output does not fit the page, then the documents
 * will be separated by newlines. This is what differentiates it from `vcat`,
 * which always lays out documents beneath one another.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('Docs:'),
 *   D.cats(D.words('lorem ipsum dolor'))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // Docs: loremipsumdolor
 *
 * // If the document exceeds the width of the page, the documents are rendered
 * // one above another
 * console.log(pipe(doc, R.renderPretty(10)))
 * // Docs: lorem
 * // ipsum
 * // dolor
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops cats
 */
export const cats: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.cats

/**
 * The `catWithLine` combinator concatenates two documents by placing a `line`
 * document between them.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithLine_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a
 * // b
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects catWithLine
 * @tsplus pipeable effect/printer/Doc catWithLine
 */
export const catWithLine: <A>(that: Doc<A>) => (self: Doc<A>) => Doc<A> = D.catWithLine

/**
 * The `catWithLineBreak` combinator concatenates two documents by placing a
 * `lineBreak` document between them.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithLineBreak_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a
 * // b
 *
 * console.log(R.renderPrettyDefault(D.group(doc)))
 * // ab
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects catWithLineBreak
 * @tsplus pipeable effect/printer/Doc catWithLineBreak
 */
export const catWithLineBreak: <A>(that: Doc<A>) => (self: Doc<A>) => Doc<A> = D.catWithLineBreak

/**
 * The `catWithSoftLine` combinator concatenates two documents by placing a
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
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects catWithSoftLine
 * @tsplus pipeable effect/printer/Doc catWithSoftLine
 */
export const catWithSoftLine: <A>(that: Doc<A>) => (self: Doc<A>) => Doc<A> = D.catWithSoftLine

/**
 * The `catWithSoftLineBreak` combinator concatenates two documents by
 * placing a `softLineBreak` document between them.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSoftLineBreak_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // ab
 *
 * console.log(pipe(doc, R.renderPretty(1)))
 * // a
 * // b
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects catWithSoftLineBreak
 * @tsplus pipeable effect/printer/Doc catWithSoftLineBreak
 */
export const catWithSoftLineBreak: <A>(that: Doc<A>) => (self: Doc<A>) => Doc<A> = D.catWithSoftLineBreak

/**
 * The `catWithSpace` combinator concatenates two documents by placing a
 * `space` document between them.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.appendWithSpace_(D.char('a'), D.char('b'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // a b
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects catWithSpace
 * @tsplus pipeable effect/printer/Doc catWithSpace
 */
export const catWithSpace: <A>(that: Doc<A>) => (self: Doc<A>) => Doc<A> = D.catWithSpace

/**
 * The `concatWith` combinator concatenates all documents in a collection
 * element-wise with the specified binary function.
 *
 * @exampleTodo
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
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops concatWith
 */
export const concatWith: <A>(
  f: (x: Doc<A>, y: Doc<A>) => Doc<A>
) => (
  docs: Iterable<Doc<A>>
) => Doc<A> = D.concatWith

/**
 * The `vcat` combinator concatenates all documents in a collection vertically.
 * If the output is grouped then the line breaks are removed.
 *
 * In other words `vcat` is like `vsep`, with newlines removed instead of
 * replaced by spaces.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.vcat(D.words('lorem ipsum dolor'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // lorem
 * // ipsum
 * // dolor
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops vcat
 */
export const vcat: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.vcat

/**
 * The `hcat` combinator concatenates all documents in a collection horizontally
 * without any spacing.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat(D.words('lorem ipsum dolor'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // loremipsumdolor
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops hcat
 */
export const hcat: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.hcat

/**
 * The `fillCat` combinator concatenates all documents in a collection
 * horizontally by placing a `empty` between each pair of documents as long as
 * they fit the page. Once the page width is exceeded, a `lineBreak` is inserted
 * and the process is repeated for all documents in the collection.
 *
 * **Note**: the use of `lineBreak` means that if `group`ed, the documents will
 * be separated with `empty` instead of newlines. See `fillSep` if you want a
 * `space` instead.
 *
 * @category concatenation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops fillCat
 */
export const fillCat: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.fillCat

// -----------------------------------------------------------------------------
// Separation
// -----------------------------------------------------------------------------

/**
 * The `hsep` combinator concatenates all documents in a collection horizontally
 * by placing a `space` between each pair of documents.
 *
 * For automatic line breaks, consider using `fillSep`.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep(D.words('lorem ipsum dolor sit amet'))
 *
 * console.log(pipe(doc, R.renderPretty(80)))
 * // lorem ipsum dolor sit amet
 *
 * // The `hsep` combinator will not introduce line breaks on its own, even when
 * // the page is too narrow
 * console.log(pipe(doc, R.renderPretty(5)))
 * // lorem ipsum dolor sit amet
 *
 * @category separation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops hsep
 */
export const hsep: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.hsep

/**
 * The `vsep` combinator concatenates all documents in a collection vertically.
 * If a `group` undoes the line breaks inserted by `vsep`, the documents are
 * separated with a space instead.
 *
 * When a `vsep` is `group`ed, the documents are separated with a `space` if the
 * layoutfits the page, otherwise nothing is done. See the `sep` convenience
 * function for this use case.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const unaligned = D.hsep([
 *   D.text('prefix'),
 *   D.vsep(D.words('text to lay out'))
 * ])
 *
 * console.log(R.renderPrettyDefault(unaligned))
 * // prefix text
 * // to
 * // lay
 * // out
 *
 * // The `align` function can be used to align the documents under their first element
 * const aligned = D.hsep([
 *   D.text('prefix'),
 *   D.align(D.vsep(D.words('text to lay out')))
 * ])
 *
 * console.log(R.renderPrettyDefault(aligned))
 * // prefix text
 * //        to
 * //        lay
 * //        out
 *
 * @category separation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops vsep
 */
export const vsep: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.vsep

/**
 * The `fillSep` combinator concatenates all documents in a collection
 * horizontally by placing a `space` between each pair of documents as long as
 * they fit the page. Once the page width is exceeded, a `line` is inserted and
 * the process is repeated for all documents in the collection.
 *
 * **Note**: the use of `line` means that if `group`ed, the documents will be
 * separated with a `space` instead of newlines. See `fillCat` if you do not
 * want a `space`.
 *
 * @category separation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops fillSep
 */
export const fillSep: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.fillSep

/**
 * The `seps` combinator will attempt to lay out a collection of documents
 * separated by `space`s. If the output does not fit the page, then the
 * documents will be separated by newlines. This is what differentiates it from
 * `vsep`, which always lays out documents beneath one another.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.seps(D.words('text to lay out'))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // prefix text to lay out
 *
 * // If the page width is too narrow, documents are separated by newlines
 * console.log(pipe(doc, R.renderPretty(20)))
 * // prefix text
 * // to
 * // lay
 * // out
 *
 * @category separation
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops seps
 */
export const seps: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.seps

// -----------------------------------------------------------------------------
// Alternative Layouts
// -----------------------------------------------------------------------------

/**
 * The `flatAlt` document will render `left` by default. However, when
 * `group`ed, `y` will be preferred with `left` as the fallback for cases where
 * `y` does not fit onto the page.
 *
 * **NOTE**:
 * Users should be careful to ensure that `left` is less wide than `right`.
 * Otherwise, if `right` ends up not fitting the page, then the layout
 * algorithms will fall back to an even wider layout.
 *
 * @exampleTodo
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
 *
 * @category alternative layouts
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops flatAlt
 * @tsplus pipeable effect/printer/Doc flatAlt
 */
export const flatAlt: <B>(that: Doc<B>) => <A>(self: Doc<A>) => Doc<A | B> = D.flatAlt

/**
 * @category alternative layouts
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops union
 * @tsplus pipeable effect/printer/Doc union
 */
export const union: <B>(that: Doc<B>) => <A>(self: Doc<A>) => Doc<B | A> = D.union

/**
 * The `group` combinator attempts to lay out a document onto a single line by
 * removing the contained line breaks. If the result does not fit the page, or
 * if a `hardLine` prevents flattening the document, `x` is laid out without
 * any changes.
 *
 * The `group` function is key to layouts that adapt to available space nicely.
 *
 * @category alternative layouts
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops group
 * @tsplus getter effect/printer/Doc group
 */
export const group: <A>(self: Doc<A>) => Doc<A> = D.group

// -----------------------------------------------------------------------------
// Reactive Layouts
// -----------------------------------------------------------------------------

/**
 * Lays out a document depending upon the column at which the document starts.
 *
 * @exampleTodo
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
 *
 * @category reactive layouts
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops column
 */
export const column: <A>(react: (position: number) => Doc<A>) => Doc<A> = D.column

/**
 * Lays out a document depending upon the current nesting level (i.e., the
 * current indentation of the document).
 *
 * @exampleTodo
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
 *
 * @category reactive layouts
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops nesting
 */
export const nesting: <A>(react: (level: number) => Doc<A>) => Doc<A> = D.nesting

/**
 * The `width` combinator makes the column width of a document available to the
 * document while rendering.
 *
 * @exampleTodo
 * import * as A from "@effect-ts/core/Array"
 * import { flow } from "@effect-ts/core/Function"
 * import type { Doc } from "@effect-ts/printer/Core/Doc"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const annotate: <A>(doc: Doc<A>) => Doc<A> = flow(
 *   D.brackets,
 *   D.width((w) => D.text(` <- width: ${w}`))
 * )
 *
 * const docs = [
 *   D.text("---"),
 *   D.text("------"),
 *   D.indent_(D.text("---"), 3),
 *   D.vsep([D.text("---"), D.indent_(D.text("---"), 4)])
 * ]
 *
 * const doc = D.align(D.vsep(A.map_(docs, annotate)))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // [---] <- width: 5
 * // [------] <- width: 8
 * // [   ---] <- width: 8
 * // [---
 * //     ---] <- width: 8
 *
 * @category reactive layouts
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects width
 * @tsplus pipeable effect/printer/Doc width
 */
export const width: <A, B>(react: (width: number) => Doc<A>) => (self: Doc<B>) => Doc<A | B> = D.width

/**
 * Lays out a document according to the document's`PageWidth`.
 *
 * @exampleTodo
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
 *
 * @category constructors
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops pageWidth
 */
export const pageWidth: <A>(react: (pageWidth: PageWidth) => Doc<A>) => Doc<A> = D.pageWidth

// -----------------------------------------------------------------------------
// Alignment
// -----------------------------------------------------------------------------

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
 * @exampleTodo
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
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops nest
 * @tsplus pipeable effect/printer/Doc nest
 */
export const nest: (indent: number) => <A>(self: Doc<A>) => Doc<A> = D.nest

/**
 * The `align` combinator lays out a document with the nesting level set to the
 * current column.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * // As an example, the documents below will be placed one above the other
 * // regardless of the current nesting level
 *
 * // Without `align`ment, the second line is simply placed below everything
 * // that has been laid out so far
 * const unaligned = D.hsep([
 *   D.text('lorem'),
 *   D.vsep([D.text('ipsum'), D.text('dolor')])
 * ])
 *
 * console.log(R.renderPrettyDefault(unaligned))
 * // lorem ipsum
 * // dolor
 *
 * // With `align`ment, the `vsep`ed documents all start at the same column
 * const aligned = D.hsep([
 *   D.text('lorem'),
 *   D.align(D.vsep([D.text('ipsum'), D.text('dolor')]))
 * ])
 *
 * console.log(R.renderPrettyDefault(aligned))
 * // lorem ipsum
 * //       dolor
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus getter effect/printer/Doc align
 */
export const align: <A>(self: Doc<A>) => Doc<A> = D.align

/**
 * The `hang` combinator lays out a document with the nesting level set to
 * the *current column* plus the specified `indent`. Negative values for
 * `indent` are allowed and decrease the nesting level accordingly.
 *
 * This differs from the `nest` combinator, which is based on the *current
 * nesting level* plus the specified `indent`. When you're not sure, try the
 * more efficient combinator (`nest`) first.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text('prefix'),
 *   D.hang_(D.reflow('Indenting these words with hang'), 4)
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(24)))
 * // prefix Indenting these
 * //            words with
 * //            hang
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects hang
 * @tsplus pipeable effect/printer/Doc hang
 */
export const hang: <A>(indent: number) => (self: Doc<A>) => Doc<A> = D.hang

/**
 * The `indent` combinator indents a document by the specified `indent`
 * beginning from the current cursor position.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hcat([
 *   D.text('prefix'),
 *   D.indent_(D.reflow('The indent function indents these words!'), 4)
 * ])
 *
 * console.log(pipe(doc, R.renderPretty(24)))
 * // prefix    The indent
 * //           function
 * //           indents these
 * //           words!
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects indent
 * @tsplus pipeable effect/printer/Doc indent
 */
export const indent: <A>(indent: number) => (self: Doc<A>) => Doc<A> = D.indent

/**
 * The `encloseSep` combinator concatenates a collection of documents,
 * separating each document in the collection using the specified `sep`
 * document. After concatenation, the resulting document is enclosed by the
 * specified `left` and `right` documents.
 *
 * To place the `sep` document at the end of each entry, see the `punctuate`
 * combinator.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as A from '@effect-ts/core/Array'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.hsep([
 *   D.text("list"),
 *   D.align(
 *     pipe(
 *       A.map_(["1", "20", "300", "4000"], (n) =>
 *         n.length === 1 ? D.char(n) : D.text(n)
 *       ),
 *       D.encloseSep(D.lbracket, D.rbracket, D.comma)
 *     )
 *   )
 * ])
 *
 * // The documents are laid out horizontally if that fits the page:
 * console.log(R.renderPrettyDefault(doc))
 * // list [1,20,300,4000]
 *
 * // Otherwise they are laid out vertically, with separators put in the front:
 * console.log(pipe(doc, R.renderPretty(10)))
 * // list [1
 * //      ,20
 * //      ,300
 * //      ,4000]
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops encloseSep
 */
export const encloseSep: <A, B, C>(
  left: Doc<A>,
  right: Doc<B>,
  sep: Doc<C>
) => <D>(docs: Iterable<Doc<D>>) => Doc<A | B | C | D> = D.encloseSep

/**
 * A Haskell-inspired variant of `encloseSep` that uses a comma as the separator
 * and braces as the enclosure for a collection of documents.
 *
 * @exampleTodo
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
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops list
 */
export const list: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.list

/**
 * A Haskell-inspired variant of `encloseSep` that uses a comma as the separator
 * and parentheses as the enclosure for a collection of documents.
 *
 * @exampleTodo
 * import * as A from "@effect-ts/core/Array"
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const doc = D.tupled(
 *   A.map_(["1", "20", "300", "4000"], (n) => (n.length === 1 ? D.char(n) : D.text(n)))
 * )
 *
 * console.log(R.renderPrettyDefault(doc))
 * // (1, 20, 300, 4000)
 *
 * @category alignment
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops tupled
 */
export const tupled: <A>(docs: Iterable<Doc<A>>) => Doc<A> = D.tupled

// -----------------------------------------------------------------------------
// Filling
// -----------------------------------------------------------------------------

/**
 * The `fill` combinator first lays out the document `x` and then appends
 * `space`s until the width of the document is equal to the specified `width`.
 * If the width of `x` is already larger than the specified `width`, nothing is
 * appended.
 *
 * @exampleTodo
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
 *
 * @category filling
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects fill
 * @tsplus pipeable effect/printer/Doc fill
 */
export const fill: <A>(width: number) => (self: Doc<A>) => Doc<A> = D.fill

/**
 * The `fillBreak` combinator first lays out the document `x` and then appends
 * `space`s until the width of the document is equal to the specified `width`.
 * If the width of `x` is already larger than the specified `width`, the nesting
 * level is increased by the specified `width` and a `line` is appended.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
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
 *   D.hsep([D.fillBreak_(D.text(name), 5), D.text('::'), D.text(type)])
 *
 * const doc = D.hsep([
 *   D.text('let'),
 *   D.align(D.vcat(A.map_(signatures, prettySignature)))
 * ])
 *
 * console.log(R.renderPrettyDefault(doc))
 * // let empty :: Doc
 * //     nest  :: Int -> Doc -> Doc
 * //     fillSep
 * //           :: [Doc] -> Doc
 *
 * @category filling
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects fillBreak
 * @tsplus pipeable effect/printer/Doc fillBreak
 */
export const fillBreak: <A>(width: number) => (self: Doc<A>) => Doc<A> = D.fillBreak

// -----------------------------------------------------------------------------
// Flattening
// -----------------------------------------------------------------------------

/**
 * Flattens a document but does not report changes.
 *
 * @category flattening
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops flatten
 * @tsplus getter effect/printer/Doc flatten
 */
export const flatten: <A>(self: Doc<A>) => Doc<A> = D.flatten

/**
 * Select the first element of each `Union` and discard the first element of
 * each `FlatAlt` to produce a "flattened" version of the input document.
 *
 * The result is `Flattened` if the element might change depending on the chosen
 * layout algorithm (i.e., the resulting document contains sub-documents that
 * may be rendered differently).
 *
 * The result is `AlreadyFlat` if the document is static (i.e., the resulting
 * document contains only a plain `Empty` node).
 *
 * `NeverFlat` is returned when the document cannot be flattened because it
 * contains either a hard `Line` or a `Fail`.
 *
 * @category flattening
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops changesUponFlattening
 * @tsplus getter effect/printer/Doc changesUponFlattening
 */
export const changesUponFlattening: <A>(self: Doc<A>) => Flatten<Doc<A>> = D.changesUponFlattening

// -----------------------------------------------------------------------------
// Annotations
// -----------------------------------------------------------------------------

/**
 * Adds an annotation to a `Doc`. The annotation can then be used by the rendering
 * algorithm to, for example, add color to certain parts of the output.
 *
 * **Note** This function is relevant only for custom formats with their own annotations,
 * and is not relevant for basic pretty printing.
 *
 * @category annotations
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects annotate
 * @tsplus pipeable effect/printer/Doc annotate
 */
export const annotate: <A>(annotation: A) => <B>(self: Doc<B>) => Doc<A | B> = D.annotate

/**
 * Change the annotations of a document. Individual annotations can be removed,
 * changed, or replaced by multiple ones.
 *
 * This is a general function that combines `unAnnotate` and `reAnnotate`, and
 * is useful for mapping semantic annotations (such as »this is a keyword«) to
 * display annotations (such as »this is red and underlined«) because some
 * backends may not care about certain annotations while others may.
 *
 * Annotations earlier in the new list will be applied earlier, so returning
 * `[Bold, Green]` will result in a bold document that contains green text, and
 * not vice versa.
 *
 * Since this traverses the entire document tree, including the parts that are
 * not rendered (due to other layouts having better fit), it is preferable to
 * reannotate a document **after** producing the layout by using
 * `alterAnnotations` from the `SimpleDocStream` module.
 *
 * @category annotations
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects alterAnnotations
 * @tsplus pipeable effect/printer/Doc alterAnnotations
 */
export const alterAnnotations: <A, B>(
  f: (a: A) => Iterable<B>
) => (
  self: Doc<A>
) => Doc<B> = D.alterAnnotations

/**
 * Changes the annotation of a document. Useful for modifying documents embedded
 * with one form of annotation with a more general annotation.
 *
 * **Note** that with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to reannotate a document after producing the
 * layout using `reAnnotateS`.
 *
 * @category annotations
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects map
 * @tsplus static effect/printer/Doc.Aspects reAnnotate
 * @tsplus pipeable effect/printer/Doc map
 * @tsplus pipeable effect/printer/Doc reAnnotate
 */
export const reAnnotate: <A, B>(f: (a: A) => B) => (self: Doc<A>) => Doc<B> = D.reAnnotate

/**
 * Removes all annotations from a document.
 *
 * **Note**: with each invocation, the entire document tree is traversed.
 * If possible, it is preferable to unannotate a document after producing the
 * layout using `unAnnotateS`.
 *
 * @category annotations
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops unAnnotate
 * @tsplus getter effect/printer/Doc unAnnotate
 */
export const unAnnotate: <A>(self: Doc<A>) => Doc<never> = D.unAnnotate

// -----------------------------------------------------------------------------
// Folding
// -----------------------------------------------------------------------------

/**
 * @category folding
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects match
 * @tsplus pipeable effect/printer/Doc match
 */
export const match: <A, R>(patterns: {
  readonly Fail: () => R
  readonly Empty: () => R
  readonly Char: (char: string) => R
  readonly Text: (text: string) => R
  readonly Line: () => R
  readonly FlatAlt: (x: Doc<A>, y: Doc<A>) => R
  readonly Cat: (x: Doc<A>, y: Doc<A>) => R
  readonly Nest: (indent: number, doc: Doc<A>) => R
  readonly Union: (x: Doc<A>, y: Doc<A>) => R
  readonly Column: (react: (position: number) => Doc<A>) => R
  readonly WithPageWidth: (react: (pageWidth: PageWidth) => Doc<A>) => R
  readonly Nesting: (react: (level: number) => Doc<A>) => R
  readonly Annotated: (annotation: A, doc: Doc<A>) => R
}) => (self: Doc<A>) => R = D.match

// -----------------------------------------------------------------------------
// Instances
// -----------------------------------------------------------------------------

/**
 * @category instances
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops getSemigroup
 */
export const getSemigroup: <A>() => Semigroup<Doc<A>> = D.getSemigroup

/**
 * @category instances
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops getMonoid
 */
export const getMonoid: <A>() => Monoid<Doc<A>> = D.getMonoid

/**
 * @category instances
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops Functor
 */
export const Functor: _Functor<Doc.TypeLambda> = D.Functor

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

/**
 * The `surround` combinator encloses a document `x` in between `left` and
 * `right` documents.
 *
 * @exampleTodo
 * import { pipe } from '@effect-ts/core/Function'
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = pipe(D.char('-'), D.enclose(D.char('A'), D.char('Z')))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // A-Z
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Aspects surround
 * @tsplus pipeable effect/printer/Doc surround
 */
export const surround: <B, C>(
  left: Doc<B>,
  right: Doc<C>
) => <A>(
  self: Doc<A>
) => Doc<A | B | C> = D.surround

/**
 * Encloses the input document in single quotes (`''`).
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops singleQuoted
 * @tsplus getter effect/printer/Doc singleQuoted
 */
export const singleQuoted: <A>(self: Doc<A>) => Doc<A> = D.singleQuoted

/**
 * Encloses the input document in double quotes (`""`).
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops doubleQuoted
 * @tsplus getter effect/printer/Doc doubleQuoted
 */
export const doubleQuoted: <A>(self: Doc<A>) => Doc<A> = D.doubleQuoted

/**
 * Encloses the input document in parentheses (`()`).
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops parenthesized
 * @tsplus getter effect/printer/Doc parenthesized
 */
export const parenthesized: <A>(self: Doc<A>) => Doc<A> = D.parenthesized

/**
 * Encloses the input document in angle brackets (`<>`).
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops angledBracketed
 * @tsplus getter effect/printer/Doc angledBracketed
 */
export const angleBracketed: <A>(self: Doc<A>) => Doc<A> = D.angleBracketed

/**
 * Encloses the input document in square brackets (`[]`).
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops squareBracketed
 * @tsplus getter effect/printer/Doc squareBracketed
 */
export const squareBracketed: <A>(self: Doc<A>) => Doc<A> = D.squareBracketed

/**
 * Encloses the input document in curly braces (`{}`).
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops curlyBraced
 * @tsplus getter effect/printer/Doc curlyBraced
 */
export const curlyBraced: <A>(self: Doc<A>) => Doc<A> = D.curlyBraced

/**
 * The `spaces` combinator lays out a document containing `n` spaces. Negative
 * values for `n` count as `0` spaces.
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.brackets(D.dquotes(D.spaces(5)))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // ["     "]
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops spaces
 */
export const spaces: (n: number) => Doc<never> = D.spaces

/**
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops textSpaces
 */
export const textSpaces: (n: number) => string = D.textSpaces

/**
 * Splits a string of words into individual `Text` documents using the
 * specified `char` to split on (defaults to `' '`).
 *
 * @exampleTodo
 * import * as D from '@effect-ts/printer/Core/Doc'
 * import * as R from '@effect-ts/printer/Core/Render'
 *
 * const doc = D.tupled(D.words('lorem ipsum dolor'))
 *
 * console.log(R.renderPrettyDefault(doc))
 * // (lorem, ipsum, dolor)
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops words
 */
export const words: (s: string, char?: string) => ReadonlyArray<Doc<never>> = D.words

/**
 * Splits a string of words into individual `Text` documents using the specified
 * `char` to split on (defaults to `' '`). In addition, a `softLine` is inserted
 * in between each word so that if the text exceeds the available width it will
 * be broken into multiple lines.
 *
 * @exampleTodo
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
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops reflow
 */
export const reflow: (s: string, char?: string) => Doc<never> = D.reflow

/**
 * The `punctuate` combinator appends the `punctuator` document to all but the
 * last document in a collection of documents. The separators are places after
 * the document entries, which can be observed if the result is oriented
 * vertically.
 *
 * @exampleTodo
 * import * as D from "@effect-ts/printer/Core/Doc"
 * import * as R from "@effect-ts/printer/Core/Render"
 *
 * const docs = D.punctuate_(D.words("lorem ipsum dolor sit amet"), D.comma)
 *
 * console.log(R.renderPrettyDefault(D.hsep(docs)))
 * // lorem, ipsum, dolor, sit, amet
 *
 * // The separators are put at the end of the entries, which can be better
 * // visualzied if the documents are rendered vertically
 * console.log(R.renderPrettyDefault(D.vsep(docs)))
 * // lorem,
 * // ipsum,
 * // dolor,
 * // sit,
 * // amet
 * ```
 *
 * @category utilities
 * @since 1.0.0
 * @tsplus static effect/printer/Doc.Ops punctuate
 */
export const punctuate: <A, B>(
  punctuator: Doc<A>
) => (
  docs: Iterable<Doc<B>>
) => ReadonlyArray<Doc<A | B>> = D.punctuate
