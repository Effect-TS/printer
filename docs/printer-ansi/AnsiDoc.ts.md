---
title: AnsiDoc.ts
nav_order: 2
parent: "@effect/printer-ansi"
---

## AnsiDoc overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [alignment](#alignment)
  - [align](#align)
  - [encloseSep](#enclosesep)
  - [hang](#hang)
  - [indent](#indent)
  - [list](#list)
  - [nest](#nest)
  - [tupled](#tupled)
- [alternative layouts](#alternative-layouts)
  - [flatAlt](#flatalt)
  - [group](#group)
  - [union](#union)
- [annotations](#annotations)
  - [alterAnnotations](#alterannotations)
  - [annotate](#annotate)
  - [reAnnotate](#reannotate)
  - [unAnnotate](#unannotate)
- [combinators](#combinators)
  - [map](#map)
- [commands](#commands)
  - [cursorBackward](#cursorbackward)
  - [cursorDown](#cursordown)
  - [cursorForward](#cursorforward)
  - [cursorHide](#cursorhide)
  - [cursorLeft](#cursorleft)
  - [cursorNextLine](#cursornextline)
  - [cursorPrevLine](#cursorprevline)
  - [cursorRestorePosition](#cursorrestoreposition)
  - [cursorSavePosition](#cursorsaveposition)
  - [cursorShow](#cursorshow)
  - [cursorUp](#cursorup)
  - [eraseDown](#erasedown)
  - [eraseEndLine](#eraseendline)
  - [eraseLine](#eraseline)
  - [eraseLines](#eraselines)
  - [eraseScreen](#erasescreen)
  - [eraseStartLine](#erasestartline)
  - [eraseUp](#eraseup)
- [concatenation](#concatenation)
  - [cat](#cat)
  - [catWithLine](#catwithline)
  - [catWithLineBreak](#catwithlinebreak)
  - [catWithSoftLine](#catwithsoftline)
  - [catWithSoftLineBreak](#catwithsoftlinebreak)
  - [catWithSpace](#catwithspace)
  - [cats](#cats)
  - [concatWith](#concatwith)
  - [hcat](#hcat)
  - [vcat](#vcat)
- [constructors](#constructors)
  - [beep](#beep)
  - [char](#char)
  - [cursorMove](#cursormove)
  - [cursorTo](#cursorto)
  - [string](#string)
  - [text](#text)
- [destructors](#destructors)
  - [render](#render)
- [filling](#filling)
  - [fill](#fill)
  - [fillBreak](#fillbreak)
  - [fillCat](#fillcat)
  - [fillSep](#fillsep)
- [flattening](#flattening)
  - [changesUponFlattening](#changesuponflattening)
  - [flatten](#flatten)
- [instances](#instances)
  - [Invariant](#invariant)
- [matching](#matching)
  - [match](#match)
- [model](#model)
  - [AlreadyFlat](#alreadyflat)
  - [Annotated](#annotated)
  - [AnsiDoc (type alias)](#ansidoc-type-alias)
  - [Cat](#cat-1)
  - [Char](#char-1)
  - [Column](#column)
  - [Covariant](#covariant)
  - [Doc](#doc)
  - [DocTypeId](#doctypeid)
  - [DocTypeLambda](#doctypelambda)
  - [Empty](#empty)
  - [Fail](#fail)
  - [FlatAlt](#flatalt-1)
  - [Flatten](#flatten-1)
  - [Flattened](#flattened)
  - [Line](#line)
  - [Nest](#nest-1)
  - [Nesting](#nesting)
  - [NeverFlat](#neverflat)
  - [Text](#text-1)
  - [Union](#union-1)
  - [WithPageWidth](#withpagewidth)
- [primitives](#primitives)
  - [backslash](#backslash)
  - [colon](#colon)
  - [comma](#comma)
  - [dot](#dot)
  - [dquote](#dquote)
  - [empty](#empty-1)
  - [equalSign](#equalsign)
  - [fail](#fail-1)
  - [hardLine](#hardline)
  - [langle](#langle)
  - [lbrace](#lbrace)
  - [lbracket](#lbracket)
  - [line](#line-1)
  - [lineBreak](#linebreak)
  - [lparen](#lparen)
  - [rangle](#rangle)
  - [rbrace](#rbrace)
  - [rbracket](#rbracket)
  - [rparen](#rparen)
  - [semi](#semi)
  - [slash](#slash)
  - [softLine](#softline)
  - [softLineBreak](#softlinebreak)
  - [space](#space)
  - [squote](#squote)
  - [vbar](#vbar)
- [reactive layouts](#reactive-layouts)
  - [column](#column-1)
  - [nesting](#nesting-1)
  - [pageWidth](#pagewidth)
  - [width](#width)
- [refinements](#refinements)
  - [isAnnotated](#isannotated)
  - [isCat](#iscat)
  - [isChar](#ischar)
  - [isColumn](#iscolumn)
  - [isDoc](#isdoc)
  - [isEmpty](#isempty)
  - [isFail](#isfail)
  - [isFlatAlt](#isflatalt)
  - [isLine](#isline)
  - [isNest](#isnest)
  - [isNesting](#isnesting)
  - [isText](#istext)
  - [isUnion](#isunion)
  - [isWithPageWidth](#iswithpagewidth)
- [separation](#separation)
  - [hsep](#hsep)
  - [seps](#seps)
  - [vsep](#vsep)
- [utilities](#utilities)
  - [angleBracketed](#anglebracketed)
  - [curlyBraced](#curlybraced)
  - [doubleQuoted](#doublequoted)
  - [parenthesized](#parenthesized)
  - [punctuate](#punctuate)
  - [reflow](#reflow)
  - [singleQuoted](#singlequoted)
  - [spaces](#spaces)
  - [squareBracketed](#squarebracketed)
  - [surround](#surround)
  - [textSpaces](#textspaces)
  - [words](#words)
- [utils](#utils)
  - [AnsiDoc (namespace)](#ansidoc-namespace)
    - [Compact (interface)](#compact-interface)
    - [Pretty (interface)](#pretty-interface)
    - [Smart (interface)](#smart-interface)
    - [RenderConfig (type alias)](#renderconfig-type-alias)

---

# alignment

## align

**Signature**

```ts
export declare const align: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## encloseSep

**Signature**

```ts
export declare const encloseSep: {
  <A, B, C>(left: Doc<A>, right: Doc<B>, sep: Doc<C>): <D>(docs: Iterable<Doc<D>>) => Doc<A | B | C | D>
  <A, B, C, D>(docs: Iterable<Doc<D>>, left: Doc<A>, right: Doc<B>, sep: Doc<C>): Doc<A | B | C | D>
}
```

Added in v1.0.0

## hang

**Signature**

```ts
export declare const hang: { (indent: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, indent: number): Doc<A> }
```

Added in v1.0.0

## indent

**Signature**

```ts
export declare const indent: {
  (indent: number): <A>(self: Doc<A>) => Doc<A>
  <A>(self: Doc<A>, indent: number): Doc<A>
}
```

Added in v1.0.0

## list

**Signature**

```ts
export declare const list: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## nest

**Signature**

```ts
export declare const nest: { (indent: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, indent: number): Doc<A> }
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

# alternative layouts

## flatAlt

**Signature**

```ts
export declare const flatAlt: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## group

**Signature**

```ts
export declare const group: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## union

**Signature**

```ts
export declare const union: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

# annotations

## alterAnnotations

**Signature**

```ts
export declare const alterAnnotations: {
  <A, B>(f: (a: A) => Iterable<B>): (self: Doc<A>) => Doc<B>
  <A, B>(self: Doc<A>, f: (a: A) => Iterable<B>): Doc<B>
}
```

Added in v1.0.0

## annotate

**Signature**

```ts
export declare const annotate: {
  <A>(annotation: A): (self: Doc<A>) => Doc<A>
  <A>(self: Doc<A>, annotation: A): Doc<A>
}
```

Added in v1.0.0

## reAnnotate

**Signature**

```ts
export declare const reAnnotate: {
  <A, B>(f: (a: A) => B): (self: Doc<A>) => Doc<B>
  <A, B>(self: Doc<A>, f: (a: A) => B): Doc<B>
}
```

Added in v1.0.0

## unAnnotate

**Signature**

```ts
export declare const unAnnotate: <A>(self: Doc<A>) => Doc<never>
```

Added in v1.0.0

# combinators

## map

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): (self: Doc<A>) => Doc<B>
  <A, B>(self: Doc<A>, f: (a: A) => B): Doc<B>
}
```

Added in v1.0.0

# commands

## cursorBackward

Moves the cursor backward by the specified number of `columns` (default `1`)
relative to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorBackward: (columns?: number) => AnsiDoc
```

Added in v1.0.0

## cursorDown

Moves the cursor down by the specified number of `lines` (default `1`)
relative to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorDown: (lines?: number) => AnsiDoc
```

Added in v1.0.0

## cursorForward

Moves the cursor forward by the specified number of `columns` (default `1`)
relative to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorForward: (columns?: number) => AnsiDoc
```

Added in v1.0.0

## cursorHide

Hides the cursor.

**Signature**

```ts
export declare const cursorHide: AnsiDoc
```

Added in v1.0.0

## cursorLeft

Moves the cursor to the first column of the current row.

**Signature**

```ts
export declare const cursorLeft: AnsiDoc
```

Added in v1.0.0

## cursorNextLine

Moves cursor to beginning of the line the specified number of rows down
(default `1`).

**Signature**

```ts
export declare const cursorNextLine: (rows?: number) => AnsiDoc
```

Added in v1.0.0

## cursorPrevLine

Moves cursor to beginning of the line the specified number of rows up
(default `1`).

**Signature**

```ts
export declare const cursorPrevLine: (rows?: number) => AnsiDoc
```

Added in v1.0.0

## cursorRestorePosition

Restores the cursor position, encoding shift state and formatting attributes
from the previous save, if any, otherwise resets these all to their defaults.

**Signature**

```ts
export declare const cursorRestorePosition: AnsiDoc
```

Added in v1.0.0

## cursorSavePosition

Saves the cursor position, encoding shift state and formatting attributes.

**Signature**

```ts
export declare const cursorSavePosition: AnsiDoc
```

Added in v1.0.0

## cursorShow

Shows the cursor.

**Signature**

```ts
export declare const cursorShow: AnsiDoc
```

Added in v1.0.0

## cursorUp

Moves the cursor up by the specified number of `lines` (default `1`) relative
to the current cursor position.

If the cursor is already at the edge of the screen, this has no effect.

**Signature**

```ts
export declare const cursorUp: (lines?: number) => AnsiDoc
```

Added in v1.0.0

## eraseDown

Clears from the current cursor position to the end of the screen.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseDown: AnsiDoc
```

Added in v1.0.0

## eraseEndLine

Clears from the current cursor position to the end of the current line.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseEndLine: AnsiDoc
```

Added in v1.0.0

## eraseLine

Clears the current line.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseLine: AnsiDoc
```

Added in v1.0.0

## eraseLines

Erase from the current cursor position up the specified amount of rows.

**Signature**

```ts
export declare const eraseLines: (rows: number) => AnsiDoc
```

Added in v1.0.0

## eraseScreen

Clears the entire screen and move the cursor to the upper left.

**Signature**

```ts
export declare const eraseScreen: AnsiDoc
```

Added in v1.0.0

## eraseStartLine

Clears from the current cursor position to the start of the current line.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseStartLine: AnsiDoc
```

Added in v1.0.0

## eraseUp

Clears from the current cursor position to the beginning of the screen.

The current cursor position does not change.

**Signature**

```ts
export declare const eraseUp: AnsiDoc
```

Added in v1.0.0

# concatenation

## cat

**Signature**

```ts
export declare const cat: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## catWithLine

**Signature**

```ts
export declare const catWithLine: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## catWithLineBreak

**Signature**

```ts
export declare const catWithLineBreak: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## catWithSoftLine

**Signature**

```ts
export declare const catWithSoftLine: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## catWithSoftLineBreak

**Signature**

```ts
export declare const catWithSoftLineBreak: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## catWithSpace

**Signature**

```ts
export declare const catWithSpace: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## cats

**Signature**

```ts
export declare const cats: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## concatWith

**Signature**

```ts
export declare const concatWith: {
  <A>(f: (left: Doc<A>, right: Doc<A>) => Doc<A>): (docs: Iterable<Doc<A>>) => Doc<A>
  <A>(docs: Iterable<Doc<A>>, f: (left: Doc<A>, right: Doc<A>) => Doc<A>): Doc<A>
}
```

Added in v1.0.0

## hcat

**Signature**

```ts
export declare const hcat: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## vcat

**Signature**

```ts
export declare const vcat: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

# constructors

## beep

Play a beeping sound.

**Signature**

```ts
export declare const beep: AnsiDoc
```

Added in v1.0.0

## char

**Signature**

```ts
export declare const char: (char: string) => Doc<never>
```

Added in v1.0.0

## cursorMove

Move the cursor position the specified number of `rows` and `columns`
relative to the current cursor position.

If the cursor is already at the edge of the screen in either direction, then
additional movement will have no effect.

**Signature**

```ts
export declare const cursorMove: (column: number, row?: number) => AnsiDoc
```

Added in v1.0.0

## cursorTo

Moves the cursor to the specified `row` and `column`.

Though the ANSI Control Sequence for Cursor Position is `1`-based, this
method takes row and column values starting from `0` and adjusts them to `1`-
based values.

**Signature**

```ts
export declare const cursorTo: (column: number, row?: number) => AnsiDoc
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: (str: string) => Doc<never>
```

Added in v1.0.0

## text

**Signature**

```ts
export declare const text: (text: string) => Doc<never>
```

Added in v1.0.0

# destructors

## render

**Signature**

```ts
export declare const render: {
  (config: AnsiDoc.RenderConfig): (self: AnsiDoc) => string
  (self: AnsiDoc, config: AnsiDoc.RenderConfig): string
}
```

Added in v1.0.0

# filling

## fill

**Signature**

```ts
export declare const fill: { (w: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, w: number): Doc<A> }
```

Added in v1.0.0

## fillBreak

**Signature**

```ts
export declare const fillBreak: { (w: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, w: number): Doc<A> }
```

Added in v1.0.0

## fillCat

**Signature**

```ts
export declare const fillCat: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## fillSep

**Signature**

```ts
export declare const fillSep: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

# flattening

## changesUponFlattening

**Signature**

```ts
export declare const changesUponFlattening: <A>(self: Doc<A>) => Flatten<Doc<A>>
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

# instances

## Invariant

**Signature**

```ts
export declare const Invariant: Invariant<DocTypeLambda>
```

Added in v1.0.0

# matching

## match

**Signature**

```ts
export declare const match: {
  <A, R>(patterns: {
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
  }): (self: Doc<A>) => R
  <A, R>(
    self: Doc<A>,
    patterns: {
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
    }
  ): R
}
```

Added in v1.0.0

# model

## AlreadyFlat

**Signature**

```ts
export declare const AlreadyFlat: AlreadyFlat<A>
```

Added in v1.0.0

## Annotated

**Signature**

```ts
export declare const Annotated: Annotated<A>
```

Added in v1.0.0

## AnsiDoc (type alias)

**Signature**

```ts
export type AnsiDoc = Doc<Ansi>
```

Added in v1.0.0

## Cat

**Signature**

```ts
export declare const Cat: Cat<A>
```

Added in v1.0.0

## Char

**Signature**

```ts
export declare const Char: Char<A>
```

Added in v1.0.0

## Column

**Signature**

```ts
export declare const Column: Column<A>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: any
```

Added in v1.0.0

## Doc

**Signature**

```ts
export declare const Doc: Doc<A>
```

Added in v1.0.0

## DocTypeId

**Signature**

```ts
export declare const DocTypeId: typeof DocTypeId
```

Added in v1.0.0

## DocTypeLambda

**Signature**

```ts
export declare const DocTypeLambda: DocTypeLambda
```

Added in v1.0.0

## Empty

**Signature**

```ts
export declare const Empty: Empty<A>
```

Added in v1.0.0

## Fail

**Signature**

```ts
export declare const Fail: Fail<A>
```

Added in v1.0.0

## FlatAlt

**Signature**

```ts
export declare const FlatAlt: FlatAlt<A>
```

Added in v1.0.0

## Flatten

**Signature**

```ts
export declare const Flatten: Flatten<A>
```

Added in v1.0.0

## Flattened

**Signature**

```ts
export declare const Flattened: Flattened<A>
```

Added in v1.0.0

## Line

**Signature**

```ts
export declare const Line: Line<A>
```

Added in v1.0.0

## Nest

**Signature**

```ts
export declare const Nest: Nest<A>
```

Added in v1.0.0

## Nesting

**Signature**

```ts
export declare const Nesting: Nesting<A>
```

Added in v1.0.0

## NeverFlat

**Signature**

```ts
export declare const NeverFlat: NeverFlat<A>
```

Added in v1.0.0

## Text

**Signature**

```ts
export declare const Text: Text<A>
```

Added in v1.0.0

## Union

**Signature**

```ts
export declare const Union: Union<A>
```

Added in v1.0.0

## WithPageWidth

**Signature**

```ts
export declare const WithPageWidth: WithPageWidth<A>
```

Added in v1.0.0

# primitives

## backslash

**Signature**

```ts
export declare const backslash: Doc<never>
```

Added in v1.0.0

## colon

**Signature**

```ts
export declare const colon: Doc<never>
```

Added in v1.0.0

## comma

**Signature**

```ts
export declare const comma: Doc<never>
```

Added in v1.0.0

## dot

**Signature**

```ts
export declare const dot: Doc<never>
```

Added in v1.0.0

## dquote

**Signature**

```ts
export declare const dquote: Doc<never>
```

Added in v1.0.0

## empty

**Signature**

```ts
export declare const empty: Doc<never>
```

Added in v1.0.0

## equalSign

**Signature**

```ts
export declare const equalSign: Doc<never>
```

Added in v1.0.0

## fail

**Signature**

```ts
export declare const fail: Doc<never>
```

Added in v1.0.0

## hardLine

**Signature**

```ts
export declare const hardLine: Doc<never>
```

Added in v1.0.0

## langle

**Signature**

```ts
export declare const langle: Doc<never>
```

Added in v1.0.0

## lbrace

**Signature**

```ts
export declare const lbrace: Doc<never>
```

Added in v1.0.0

## lbracket

**Signature**

```ts
export declare const lbracket: Doc<never>
```

Added in v1.0.0

## line

**Signature**

```ts
export declare const line: Doc<never>
```

Added in v1.0.0

## lineBreak

**Signature**

```ts
export declare const lineBreak: Doc<never>
```

Added in v1.0.0

## lparen

**Signature**

```ts
export declare const lparen: Doc<never>
```

Added in v1.0.0

## rangle

**Signature**

```ts
export declare const rangle: Doc<never>
```

Added in v1.0.0

## rbrace

**Signature**

```ts
export declare const rbrace: Doc<never>
```

Added in v1.0.0

## rbracket

**Signature**

```ts
export declare const rbracket: Doc<never>
```

Added in v1.0.0

## rparen

**Signature**

```ts
export declare const rparen: Doc<never>
```

Added in v1.0.0

## semi

**Signature**

```ts
export declare const semi: Doc<never>
```

Added in v1.0.0

## slash

**Signature**

```ts
export declare const slash: Doc<never>
```

Added in v1.0.0

## softLine

**Signature**

```ts
export declare const softLine: Doc<never>
```

Added in v1.0.0

## softLineBreak

**Signature**

```ts
export declare const softLineBreak: Doc<never>
```

Added in v1.0.0

## space

**Signature**

```ts
export declare const space: Doc<never>
```

Added in v1.0.0

## squote

**Signature**

```ts
export declare const squote: Doc<never>
```

Added in v1.0.0

## vbar

**Signature**

```ts
export declare const vbar: Doc<never>
```

Added in v1.0.0

# reactive layouts

## column

**Signature**

```ts
export declare const column: <A>(react: (position: number) => Doc<A>) => Doc<A>
```

Added in v1.0.0

## nesting

**Signature**

```ts
export declare const nesting: <A>(react: (level: number) => Doc<A>) => Doc<A>
```

Added in v1.0.0

## pageWidth

**Signature**

```ts
export declare const pageWidth: <A>(react: (pageWidth: PageWidth) => Doc<A>) => Doc<A>
```

Added in v1.0.0

## width

**Signature**

```ts
export declare const width: {
  <A, B>(react: (width: number) => Doc<B>): (self: Doc<A>) => Doc<A | B>
  <A, B>(self: Doc<A>, react: (width: number) => Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

# refinements

## isAnnotated

**Signature**

```ts
export declare const isAnnotated: <A>(self: Doc<A>) => self is Annotated<A>
```

Added in v1.0.0

## isCat

**Signature**

```ts
export declare const isCat: <A>(self: Doc<A>) => self is Cat<A>
```

Added in v1.0.0

## isChar

**Signature**

```ts
export declare const isChar: <A>(self: Doc<A>) => self is Char<A>
```

Added in v1.0.0

## isColumn

**Signature**

```ts
export declare const isColumn: <A>(self: Doc<A>) => self is Column<A>
```

Added in v1.0.0

## isDoc

**Signature**

```ts
export declare const isDoc: (u: unknown) => u is Doc<unknown>
```

Added in v1.0.0

## isEmpty

**Signature**

```ts
export declare const isEmpty: <A>(self: Doc<A>) => self is Empty<A>
```

Added in v1.0.0

## isFail

**Signature**

```ts
export declare const isFail: <A>(self: Doc<A>) => self is Fail<A>
```

Added in v1.0.0

## isFlatAlt

**Signature**

```ts
export declare const isFlatAlt: <A>(self: Doc<A>) => self is FlatAlt<A>
```

Added in v1.0.0

## isLine

**Signature**

```ts
export declare const isLine: <A>(self: Doc<A>) => self is Line<A>
```

Added in v1.0.0

## isNest

**Signature**

```ts
export declare const isNest: <A>(self: Doc<A>) => self is Nest<A>
```

Added in v1.0.0

## isNesting

**Signature**

```ts
export declare const isNesting: <A>(self: Doc<A>) => self is Nesting<A>
```

Added in v1.0.0

## isText

**Signature**

```ts
export declare const isText: <A>(self: Doc<A>) => self is Text<A>
```

Added in v1.0.0

## isUnion

**Signature**

```ts
export declare const isUnion: <A>(self: Doc<A>) => self is Union<A>
```

Added in v1.0.0

## isWithPageWidth

**Signature**

```ts
export declare const isWithPageWidth: <A>(self: Doc<A>) => self is WithPageWidth<A>
```

Added in v1.0.0

# separation

## hsep

**Signature**

```ts
export declare const hsep: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## seps

**Signature**

```ts
export declare const seps: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## vsep

**Signature**

```ts
export declare const vsep: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

# utilities

## angleBracketed

**Signature**

```ts
export declare const angleBracketed: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## curlyBraced

**Signature**

```ts
export declare const curlyBraced: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## doubleQuoted

**Signature**

```ts
export declare const doubleQuoted: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## parenthesized

**Signature**

```ts
export declare const parenthesized: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## punctuate

**Signature**

```ts
export declare const punctuate: {
  <A, B>(punctuator: Doc<A>): (docs: Iterable<Doc<B>>) => readonly Doc<A | B>[]
  <A, B>(docs: Iterable<Doc<B>>, punctuator: Doc<A>): readonly Doc<A | B>[]
}
```

Added in v1.0.0

## reflow

**Signature**

```ts
export declare const reflow: (s: string, char?: string | undefined) => Doc<never>
```

Added in v1.0.0

## singleQuoted

**Signature**

```ts
export declare const singleQuoted: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## spaces

**Signature**

```ts
export declare const spaces: (n: number) => Doc<never>
```

Added in v1.0.0

## squareBracketed

**Signature**

```ts
export declare const squareBracketed: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## surround

**Signature**

```ts
export declare const surround: {
  <A, B, C>(left: Doc<A>, right: Doc<B>): (self: Doc<C>) => Doc<A | B | C>
  <A, B, C>(self: Doc<C>, left: Doc<A>, right: Doc<B>): Doc<A | B | C>
}
```

Added in v1.0.0

## textSpaces

**Signature**

```ts
export declare const textSpaces: (n: number) => string
```

Added in v1.0.0

## words

**Signature**

```ts
export declare const words: (s: string, char?: string | undefined) => readonly Doc<never>[]
```

Added in v1.0.0

# utils

## AnsiDoc (namespace)

Added in v1.0.0

### Compact (interface)

**Signature**

```ts
export interface Compact {
  readonly style: "compact"
}
```

Added in v1.0.0

### Pretty (interface)

**Signature**

```ts
export interface Pretty {
  readonly style: "pretty"
  readonly options?: Partial<Omit<AvailablePerLine, "_tag">>
}
```

Added in v1.0.0

### Smart (interface)

**Signature**

```ts
export interface Smart {
  readonly style: "smart"
  readonly options?: Partial<Omit<AvailablePerLine, "_tag">>
}
```

Added in v1.0.0

### RenderConfig (type alias)

**Signature**

```ts
export type RenderConfig = Compact | Pretty | Smart
```

Added in v1.0.0
