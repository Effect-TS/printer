---
title: Doc.ts
nav_order: 1
parent: "@effect/printer"
---

## Doc overview

The abstract data type `Doc<A>` represents prettified documents that have
been annotated with data of type `A`.

More specifically, a value of type `Doc` represents a non-empty set of
possible layouts for a given document. The layout algorithms select one of
these possibilities, taking into account variables such as the width of the
document.

The annotation is an arbitrary piece of data associated with (part of) a
document. Annotations may be used by rendering algorithms to display
documents differently by providing information such as:

- color information (e.g., when rendering to the terminal)
- mouseover text (e.g., when rendering to rich HTML)
- whether to show something or not (to allow simple or detailed versions)

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
- [concatenation](#concatenation)
  - [cat](#cat)
  - [catWithLine](#catwithline)
  - [catWithLineBreak](#catwithlinebreak)
  - [catWithSoftLine](#catwithsoftline)
  - [catWithSoftLineBreak](#catwithsoftlinebreak)
  - [catWithSpace](#catwithspace)
  - [cats](#cats)
  - [concatWith](#concatwith)
  - [fillCat](#fillcat)
  - [hcat](#hcat)
  - [vcat](#vcat)
- [constructors](#constructors)
  - [char](#char)
  - [pageWidth](#pagewidth)
  - [string](#string)
  - [text](#text)
- [filling](#filling)
  - [fill](#fill)
  - [fillBreak](#fillbreak)
- [flattening](#flattening)
  - [changesUponFlattening](#changesuponflattening)
  - [flatten](#flatten)
- [folding](#folding)
  - [match](#match)
- [instances](#instances)
  - [Covariant](#covariant)
  - [Invariant](#invariant)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [model](#model)
  - [Annotated (interface)](#annotated-interface)
  - [Cat (interface)](#cat-interface)
  - [Char (interface)](#char-interface)
  - [Column (interface)](#column-interface)
  - [Doc (type alias)](#doc-type-alias)
  - [DocTypeLambda (interface)](#doctypelambda-interface)
  - [Empty (interface)](#empty-interface)
  - [Fail (interface)](#fail-interface)
  - [FlatAlt (interface)](#flatalt-interface)
  - [Line (interface)](#line-interface)
  - [Nest (interface)](#nest-interface)
  - [Nesting (interface)](#nesting-interface)
  - [Text (interface)](#text-interface)
  - [Union (interface)](#union-interface)
  - [WithPageWidth (interface)](#withpagewidth-interface)
  - [WithPageWidth (interface)](#withpagewidth-interface-1)
- [primitives](#primitives)
  - [backslash](#backslash)
  - [colon](#colon)
  - [comma](#comma)
  - [dot](#dot)
  - [dquote](#dquote)
  - [empty](#empty)
  - [equalSign](#equalsign)
  - [fail](#fail)
  - [hardLine](#hardline)
  - [langle](#langle)
  - [lbrace](#lbrace)
  - [lbracket](#lbracket)
  - [line](#line)
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
  - [column](#column)
  - [nesting](#nesting)
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
  - [fillSep](#fillsep)
  - [hsep](#hsep)
  - [seps](#seps)
  - [vsep](#vsep)
- [symbol](#symbol)
  - [DocTypeId](#doctypeid)
  - [DocTypeId (type alias)](#doctypeid-type-alias)
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
  - [Doc (namespace)](#doc-namespace)
    - [Variance (interface)](#variance-interface)
    - [TypeLambda (type alias)](#typelambda-type-alias)

---

# alignment

## align

The `align` combinator lays out a document with the nesting level set to the
current column.

**Signature**

```ts
export declare const align: <A>(self: Doc<A>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

// As an example, the documents below will be placed one above the other
// regardless of the current nesting level

// Without `align`ment, the second line is simply placed below everything
// that has been laid out so far
const unaligned = Doc.hsep([Doc.text('lorem'), Doc.vsep([Doc.text('ipsum'), Doc.text('dolor')])])

assert.strictEqual(
  Render.prettyDefault(unaligned),
  String.stripMargin(
    `|lorem ipsum
     |dolor`
  )
)

// With `align`ment, the `vsep`ed documents all start at the same column
const aligned = Doc.hsep([Doc.text('lorem'), Doc.align(Doc.vsep([Doc.text('ipsum'), Doc.text('dolor')]))])

assert.strictEqual(
  Render.prettyDefault(aligned),
  String.stripMargin(
    `|lorem ipsum
     |      dolor`
  )
)
```

Added in v1.0.0

## encloseSep

The `encloseSep` combinator concatenates a collection of documents,
separating each document in the collection using the specified `sep`
document. After concatenation, the resulting document is enclosed by the
specified `left` and `right` documents.

To place the `sep` document at the end of each entry, see the `punctuate`
combinator.

**Signature**

```ts
export declare const encloseSep: {
  <A, B, C>(left: Doc<A>, right: Doc<B>, sep: Doc<C>): <D>(docs: Iterable<Doc<D>>) => Doc<A | B | C | D>
  <A, B, C, D>(docs: Iterable<Doc<D>>, left: Doc<A>, right: Doc<B>, sep: Doc<C>): Doc<A | B | C | D>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc = Doc.hsep([
  Doc.text('list'),
  Doc.align(
    pipe(
      ['1', '20', '300', '4000'].map((n) => (n.length === 1 ? Doc.char(n) : Doc.text(n))),
      Doc.encloseSep(Doc.lbracket, Doc.rbracket, Doc.comma)
    )
  ),
])

// The documents are laid out horizontally if the document fits the page
assert.strictEqual(Render.prettyDefault(doc), 'list [1,20,300,4000]')

// Otherwise they are laid out vertically, with separators put in the front
assert.strictEqual(
  Render.pretty(doc, { lineWidth: 10 }),
  String.stripMargin(
    `|list [1
     |     ,20
     |     ,300
     |     ,4000]`
  )
)
```

Added in v1.0.0

## hang

The `hang` combinator lays out a document with the nesting level set to
the _current column_ plus the specified `indent`. Negative values for
`indent` are allowed and decrease the nesting level accordingly.

This differs from the `nest` combinator, which is based on the _current
nesting level_ plus the specified `indent`. When you"re not sure, try the
more efficient combinator (`nest`) first.

**Signature**

```ts
export declare const hang: { (indent: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, indent: number): Doc<A> }
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc = Doc.hsep([Doc.text('prefix'), pipe(Doc.reflow('Indenting these words with hang'), Doc.hang(4))])

assert.strictEqual(
  Render.pretty(doc, { lineWidth: 24 }),
  String.stripMargin(
    `|prefix Indenting these
     |           words with
     |           hang`
  )
)
```

Added in v1.0.0

## indent

The `indent` combinator indents a document by the specified `indent`
beginning from the current cursor position.

**Signature**

```ts
export declare const indent: {
  (indent: number): <A>(self: Doc<A>) => Doc<A>
  <A>(self: Doc<A>, indent: number): Doc<A>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc = Doc.hcat([Doc.text('prefix'), pipe(Doc.reflow('The indent function indents these words!'), Doc.indent(4))])

assert.strictEqual(
  Render.pretty(doc, { lineWidth: 24 }),
  String.stripMargin(
    `|prefix    The indent
     |          function
     |          indents these
     |          words!`
  )
)
```

Added in v1.0.0

## list

A Haskell-inspired variant of `encloseSep` that uses a comma as the separator
and braces as the enclosure for a collection of documents.

**Signature**

```ts
export declare const list: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'

const doc = Doc.list(['1', '20', '300', '4000'].map((n) => (n.length === 1 ? Doc.char(n) : Doc.text(n))))

assert.strictEqual(Render.prettyDefault(doc), '[1, 20, 300, 4000]')
```

Added in v1.0.0

## nest

Lays out a document with the current nesting level (indentation
of the following lines) increased by the specified `indent`.
Negative values are allowed and will decrease the nesting level
accordingly.

See also:

- `hang`: nest a document relative to the current cursor
  position instead of the current nesting level
- `align`: set the nesting level to the current cursor
  position
- `indent`: increase the indentation on the spot, padding
  any empty space with spaces

**Signature**

```ts
export declare const nest: { (indent: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, indent: number): Doc<A> }
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc = Doc.vsep([pipe(Doc.vsep(Doc.words('lorem ipsum dolor')), Doc.nest(4)), Doc.text('sit'), Doc.text('amet')])

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|lorem
     |    ipsum
     |    dolor
     |sit
     |amet`
  )
)
```

Added in v1.0.0

## tupled

A Haskell-inspired variant of `encloseSep` that uses a comma as the separator
and parentheses as the enclosure for a collection of documents.

**Signature**

```ts
export declare const tupled: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'

const doc = Doc.tupled(['1', '20', '300', '4000'].map((n) => (n.length === 1 ? Doc.char(n) : Doc.text(n))))

assert.strictEqual(Render.prettyDefault(doc), '(1, 20, 300, 4000)')
```

Added in v1.0.0

# alternative layouts

## flatAlt

The `flatAlt` document will render `left` by default. However, when
`group`ed, `y` will be preferred with `left` as the fallback for cases where
`y` does not fit onto the page.

**NOTE**:
Users should be careful to ensure that `left` is less wide than `right`.
Otherwise, if `right` ends up not fitting the page, then the layout
algorithms will fall back to an even wider layout.

**Signature**

```ts
export declare const flatAlt: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const open = pipe(Doc.empty, Doc.flatAlt(Doc.text('{ ')))
const close = pipe(Doc.empty, Doc.flatAlt(Doc.text(' }')))
const separator = pipe(Doc.empty, Doc.flatAlt(Doc.text('; ')))

const prettyDo = <A>(documents: Array<Doc.Doc<A>>): Doc.Doc<A> => {
  return pipe(Doc.hsep([Doc.text('do'), pipe(documents, Doc.encloseSep(open, close, separator), Doc.align)]), Doc.group)
}

const statements = [
  Doc.text('name:_ <- getArgs'),
  Doc.text('let greet = "Hello, " <> name'),
  Doc.text('putStrLn greet'),
]

// If it fits, then the content is put onto a single line with the `{;}` style
assert.strictEqual(
  pipe(prettyDo(statements), Render.pretty({ lineWidth: 80 })),
  'do { name:_ <- getArgs; let greet = "Hello, " <> name; putStrLn greet }'
)

// When there is not enough space, the content is broken up onto multiple lines
assert.strictEqual(
  pipe(prettyDo(statements), Render.pretty({ lineWidth: 10 })),
  String.stripMargin(
    `|do name:_ <- getArgs
     |   let greet = "Hello, " <> name
     |   putStrLn greet`
  )
)
```

Added in v1.0.0

## group

The `group` combinator attempts to lay out a document onto a single line by
removing the contained line breaks. If the result does not fit the page, or
if a `hardLine` prevents flattening the document, `x` is laid out without
any changes.

The `group` function is key to layouts that adapt to available space nicely.

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

Change the annotations of a document. Individual annotations can be removed,
changed, or replaced by multiple ones.

This is a general function that combines `unAnnotate` and `reAnnotate`, and
is useful for mapping semantic annotations (such as »this is a keyword«) to
display annotations (such as »this is red and underlined«) because some
backends may not care about certain annotations while others may.

Annotations earlier in the new list will be applied earlier, so returning
`[Bold, Green]` will result in a bold document that contains green text, and
not vice versa.

Since this traverses the entire document tree, including the parts that are
not rendered (due to other layouts having better fit), it is preferable to
reannotate a document **after** producing the layout by using
`alterAnnotations` from the `SimpleDocStream` module.

**Signature**

```ts
export declare const alterAnnotations: {
  <A, B>(f: (a: A) => Iterable<B>): (self: Doc<A>) => Doc<B>
  <A, B>(self: Doc<A>, f: (a: A) => Iterable<B>): Doc<B>
}
```

Added in v1.0.0

## annotate

Adds an annotation to a `Doc`. The annotation can then be used by the rendering
algorithm to, for example, add color to certain parts of the output.

**Note** This function is relevant only for custom formats with their own annotations,
and is not relevant for basic pretty printing.

**Signature**

```ts
export declare const annotate: {
  <A>(annotation: A): (self: Doc<A>) => Doc<A>
  <A>(self: Doc<A>, annotation: A): Doc<A>
}
```

Added in v1.0.0

## reAnnotate

Changes the annotation of a document. Useful for modifying documents embedded
with one form of annotation with a more general annotation.

**Note** that with each invocation, the entire document tree is traversed.
If possible, it is preferable to reannotate a document after producing the
layout using `reAnnotateS`.

**Signature**

```ts
export declare const reAnnotate: {
  <A, B>(f: (a: A) => B): (self: Doc<A>) => Doc<B>
  <A, B>(self: Doc<A>, f: (a: A) => B): Doc<B>
}
```

Added in v1.0.0

## unAnnotate

Removes all annotations from a document.

**Note**: with each invocation, the entire document tree is traversed.
If possible, it is preferable to unannotate a document after producing the
layout using `unAnnotateS`.

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

# concatenation

## cat

The `cat` combinator lays out two documents separated by nothing.

**Signature**

```ts
export declare const cat: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

Added in v1.0.0

## catWithLine

The `catWithLine` combinator concatenates two documents by placing a `line`
document between them.

**Signature**

```ts
export declare const catWithLine: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = pipe(Doc.char('a'), Doc.catWithLine(Doc.char('b')))

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|a
     |b`
  )
)
```

Added in v1.0.0

## catWithLineBreak

The `catWithLineBreak` combinator concatenates two documents by placing a
`lineBreak` document between them.

**Signature**

```ts
export declare const catWithLineBreak: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = pipe(Doc.char('a'), Doc.catWithLineBreak(Doc.char('b')))

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|a
     |b`
  )
)

assert.strictEqual(Render.prettyDefault(Doc.group(doc)), 'ab')
```

Added in v1.0.0

## catWithSoftLine

The `catWithSoftLine` combinator concatenates two documents by placing a
`softLine` document between them.

**Signature**

```ts
export declare const catWithSoftLine: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = pipe(Doc.char('a'), Doc.catWithSoftLine(Doc.char('b')))

assert.strictEqual(Render.prettyDefault(doc), 'a b')

assert.strictEqual(
  Render.pretty(doc, { lineWidth: 1 }),
  String.stripMargin(
    `|a
     |b`
  )
)
```

Added in v1.0.0

## catWithSoftLineBreak

The `catWithSoftLineBreak` combinator concatenates two documents by
placing a `softLineBreak` document between them.

**Signature**

```ts
export declare const catWithSoftLineBreak: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = pipe(Doc.char('a'), Doc.catWithSoftLineBreak(Doc.char('b')))

assert.strictEqual(Render.prettyDefault(doc), 'ab')

assert.strictEqual(
  Render.pretty(doc, { lineWidth: 1 }),
  String.stripMargin(
    `|a
     |b`
  )
)
```

Added in v1.0.0

## catWithSpace

The `catWithSpace` combinator concatenates two documents by placing a
`space` document between them.

**Signature**

```ts
export declare const catWithSpace: {
  <B>(that: Doc<B>): <A>(self: Doc<A>) => Doc<B | A>
  <A, B>(self: Doc<A>, that: Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'

const doc: Doc.Doc<never> = pipe(Doc.char('a'), Doc.catWithSpace(Doc.char('b')))

assert.strictEqual(Render.prettyDefault(doc), 'a b')
```

Added in v1.0.0

## cats

The `cats` combinator will attempt to lay out a collection of documents
separated by nothing. If the output does not fit the page, then the documents
will be separated by newlines. This is what differentiates it from `vcat`,
which always lays out documents beneath one another.

**Signature**

```ts
export declare const cats: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hsep([Doc.text('Docs:'), Doc.cats(Doc.words('lorem ipsum dolor'))])

assert.strictEqual(Render.prettyDefault(doc), 'Docs: loremipsumdolor')

// If the document exceeds the width of the page, the documents are rendered
// one above another
assert.strictEqual(
  Render.pretty(doc, { lineWidth: 10 }),
  String.stripMargin(
    `|Docs: lorem
     |ipsum
     |dolor`
  )
)
```

Added in v1.0.0

## concatWith

The `concatWith` combinator concatenates all documents in a collection
element-wise with the specified binary function.

**Signature**

```ts
export declare const concatWith: {
  <A>(f: (left: Doc<A>, right: Doc<A>) => Doc<A>): (docs: Iterable<Doc<A>>) => Doc<A>
  <A>(docs: Iterable<Doc<A>>, f: (left: Doc<A>, right: Doc<A>) => Doc<A>): Doc<A>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'

const doc: Doc.Doc<never> = pipe(
  [Doc.char('a'), Doc.char('b')],
  Doc.concatWith((x, y) => Doc.catWithSpace(y)(x))
)

assert.strictEqual(Render.prettyDefault(doc), 'a b')
```

Added in v1.0.0

## fillCat

The `fillCat` combinator concatenates all documents in a collection
horizontally by placing a `empty` between each pair of documents as long as
they fit the page. Once the page width is exceeded, a `lineBreak` is inserted
and the process is repeated for all documents in the collection.

**Note**: the use of `lineBreak` means that if `group`ed, the documents will
be separated with `empty` instead of newlines. See `fillSep` if you want a
`space` instead.

**Signature**

```ts
export declare const fillCat: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## hcat

The `hcat` combinator concatenates all documents in a collection horizontally
without any spacing.

**Signature**

```ts
export declare const hcat: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hcat(Doc.words('lorem ipsum dolor'))

assert.strictEqual(Render.prettyDefault(doc), 'loremipsumdolor')
```

Added in v1.0.0

## vcat

The `vcat` combinator concatenates all documents in a collection vertically.
If the output is grouped then the line breaks are removed.

In other words `vcat` is like `vsep`, with newlines removed instead of
replaced by spaces.

**Signature**

```ts
export declare const vcat: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.vcat(Doc.words('lorem ipsum dolor'))

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|lorem
     |ipsum
     |dolor`
  )
)
```

Added in v1.0.0

# constructors

## char

A document containing a single character.

**Invariants**

- Cannot be the newline (`"\n"`) character

**Signature**

```ts
export declare const char: (char: string) => Doc<never>
```

Added in v1.0.0

## pageWidth

Lays out a document according to the document"s`PageWidth`.

**Signature**

```ts
export declare const pageWidth: <A>(react: (pageWidth: PageWidth) => Doc<A>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc = Doc.hsep([
  Doc.text('prefix'),
  Doc.pageWidth((pageWidth) => {
    switch (pageWidth._tag) {
      case 'AvailablePerLine': {
        const { lineWidth, ribbonFraction } = pageWidth
        return Doc.squareBracketed(Doc.text(`Width: ${lineWidth}, Ribbon Fraction: ${ribbonFraction}`))
      }
      case 'Unbounded': {
        return Doc.empty
      }
    }
  }),
])

const example = Doc.vsep([0, 4, 8].map((n) => Doc.indent(n)(doc)))

assert.strictEqual(
  Render.pretty(example, { lineWidth: 32 }),
  String.stripMargin(
    `|prefix [Width: 32, Ribbon Fraction: 1]
     |    prefix [Width: 32, Ribbon Fraction: 1]
     |        prefix [Width: 32, Ribbon Fraction: 1]`
  )
)
```

Added in v1.0.0

## string

Constructs a document containing a string of text.

**Note**: newline characters (`\n`) contained in the provided string will be
disregarded (i.e. not rendered) in the output document.

**Signature**

```ts
export declare const string: (str: string) => Doc<never>
```

Added in v1.0.0

## text

A document containing a string of text.

**Invariants**

- Text cannot be less than two characters long
- Text cannot contain a newline (`"\n"`) character

**Signature**

```ts
export declare const text: (text: string) => Doc<never>
```

Added in v1.0.0

# filling

## fill

The `fill` combinator first lays out the document `x` and then appends
`space`s until the width of the document is equal to the specified `width`.
If the width of `x` is already larger than the specified `width`, nothing is
appended.

**Signature**

```ts
export declare const fill: { (w: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, w: number): Doc<A> }
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

type Signature = [name: string, type: string]

const signatures: Array<Signature> = [
  ['empty', 'Doc'],
  ['nest', 'Int -> Doc -> Doc'],
  ['fillSep', '[Doc] -> Doc'],
]

const prettySignature = <A>([name, type]: Signature): Doc.Doc<A> =>
  Doc.hsep([pipe(Doc.text(name), Doc.fill(5)), Doc.text('::'), Doc.text(type)])

const doc = Doc.hsep([Doc.text('let'), Doc.align(Doc.vcat(signatures.map(prettySignature)))])

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|let empty :: Doc
     |    nest  :: Int -> Doc -> Doc
     |    fillSep :: [Doc] -> Doc`
  )
)
```

Added in v1.0.0

## fillBreak

The `fillBreak` combinator first lays out the document `x` and then appends
`space`s until the width of the document is equal to the specified `width`.
If the width of `x` is already larger than the specified `width`, the nesting
level is increased by the specified `width` and a `line` is appended.

**Signature**

```ts
export declare const fillBreak: { (w: number): <A>(self: Doc<A>) => Doc<A>; <A>(self: Doc<A>, w: number): Doc<A> }
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

type Signature = [name: string, type: string]

const signatures: Array<Signature> = [
  ['empty', 'Doc'],
  ['nest', 'Int -> Doc -> Doc'],
  ['fillSep', '[Doc] -> Doc'],
]

const prettySignature = <A>([name, type]: Signature): Doc.Doc<A> =>
  Doc.hsep([pipe(Doc.text(name), Doc.fillBreak(5)), Doc.text('::'), Doc.text(type)])

const doc = Doc.hsep([Doc.text('let'), Doc.align(Doc.vcat(signatures.map(prettySignature)))])

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|let empty :: Doc
     |    nest  :: Int -> Doc -> Doc
     |    fillSep
     |          :: [Doc] -> Doc`
  )
)
```

Added in v1.0.0

# flattening

## changesUponFlattening

Select the first element of each `Union` and discard the first element of
each `FlatAlt` to produce a "flattened" version of the input document.

The result is `Flattened` if the element might change depending on the chosen
layout algorithm (i.e., the resulting document contains sub-documents that
may be rendered differently).

The result is `AlreadyFlat` if the document is static (i.e., the resulting
document contains only a plain `Empty` node).

`NeverFlat` is returned when the document cannot be flattened because it
contains either a hard `Line` or a `Fail`.

**Signature**

```ts
export declare const changesUponFlattening: <A>(self: Doc<A>) => Flatten<Doc<A>>
```

Added in v1.0.0

## flatten

Flattens a document but does not report changes.

**Signature**

```ts
export declare const flatten: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

# folding

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

# instances

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<DocTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<DocTypeLambda>
```

Added in v1.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>(_: void) => Monoid<Doc<A>>
```

Added in v1.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>(_: void) => Semigroup<Doc<A>>
```

Added in v1.0.0

# model

## Annotated (interface)

Represents a document with an associated annotation.

**Signature**

```ts
export interface Annotated<A> extends Doc.Variance<A> {
  readonly _tag: 'Annotated'
  readonly annotation: A
  readonly doc: Doc<A>
}
```

Added in v1.0.0

## Cat (interface)

Represents the concatenation of two documents.

**Signature**

```ts
export interface Cat<A> extends Doc.Variance<A> {
  readonly _tag: 'Cat'
  readonly left: Doc<A>
  readonly right: Doc<A>
}
```

Added in v1.0.0

## Char (interface)

Represents a document containing a single character.

**Invariants**

- Cannot be the newline (`"\n"`) character

**Signature**

```ts
export interface Char<A> extends Doc.Variance<A> {
  readonly _tag: 'Char'
  readonly char: string
}
```

Added in v1.0.0

## Column (interface)

Represents a document that reacts to the current cursor position.

**Signature**

```ts
export interface Column<A> extends Doc.Variance<A> {
  readonly _tag: 'Column'
  readonly react: (position: number) => Doc<A>
}
```

Added in v1.0.0

## Doc (type alias)

Represents a prettified document that has been annotated with data of type
`A`.

**Signature**

```ts
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
```

Added in v1.0.0

## DocTypeLambda (interface)

**Signature**

```ts
export interface DocTypeLambda extends TypeLambda {
  readonly type: Doc<this['Target']>
}
```

Added in v1.0.0

## Empty (interface)

Represents the empty document.

Conceptually, the `Empty` document can be thought of as the unit of `Cat`.

**Signature**

```ts
export interface Empty<A> extends Doc.Variance<A> {
  readonly _tag: 'Empty'
}
```

Added in v1.0.0

## Fail (interface)

Represents a document that cannot be rendered. Generally occurs when
flattening a line. The layout algorithms will reject this document and choose
a more suitable rendering.

**Signature**

```ts
export interface Fail<A> extends Doc.Variance<A> {
  readonly _tag: 'Fail'
}
```

Added in v1.0.0

## FlatAlt (interface)

Represents a flattened alternative of two documents. The layout algorithms
will choose the first document, but when flattened (via `group`) the second
document will be preferreinternal.

The layout algorithms operate under the assumption that the first alternative
is less wide than the flattened second alternative.

**Signature**

```ts
export interface FlatAlt<A> extends Doc.Variance<A> {
  readonly _tag: 'FlatAlt'
  readonly left: Doc<A>
  readonly right: Doc<A>
}
```

Added in v1.0.0

## Line (interface)

Represents a document that contains a hard line break.

**Signature**

```ts
export interface Line<A> extends Doc.Variance<A> {
  readonly _tag: 'Line'
}
```

Added in v1.0.0

## Nest (interface)

Represents a document that is indented by a certain number of columns.

**Signature**

```ts
export interface Nest<A> extends Doc.Variance<A> {
  readonly _tag: 'Nest'
  readonly indent: number
  readonly doc: Doc<A>
}
```

Added in v1.0.0

## Nesting (interface)

Represents a document that reacts to the current nesting level.

**Signature**

```ts
export interface Nesting<A> extends Doc.Variance<A> {
  readonly _tag: 'Nesting'
  readonly react: (level: number) => Doc<A>
}
```

Added in v1.0.0

## Text (interface)

Represents a document containing a string of text.

**Invariants**

- Text cannot be less than two characters long
- Text cannot contain a newline (`"\n"`) character

**Signature**

```ts
export interface Text<A> extends Doc.Variance<A> {
  readonly _tag: 'Text'
  readonly text: string
}
```

Added in v1.0.0

## Union (interface)

Represents the union of two documents. Used to implement layout alternatives
for `group`.

**Invariants**

- The first lines of the first document should be longer than the first lines
  of the second document so that the layout algorithm can pick the document
  with the best fit.

**Signature**

```ts
export interface Union<A> extends Doc.Variance<A> {
  readonly _tag: 'Union'
  readonly left: Doc<A>
  readonly right: Doc<A>
}
```

Added in v1.0.0

## WithPageWidth (interface)

Represents a document that reacts to the current page width.

**Signature**

```ts
export interface WithPageWidth<A> extends Doc.Variance<A> {
  readonly _tag: 'WithPageWidth'
  readonly react: (pageWidth: PageWidth) => Doc<A>
}
```

Added in v1.0.0

## WithPageWidth (interface)

Represents a document that reacts to the current page width.

**Signature**

```ts
export interface WithPageWidth<A> extends Doc.Variance<A> {
  readonly _tag: 'WithPageWidth'
  readonly react: (pageWidth: PageWidth) => Doc<A>
}
```

Added in v1.0.0

# primitives

## backslash

A document containing a single `\` character.

**Signature**

```ts
export declare const backslash: Doc<never>
```

Added in v1.0.0

## colon

A document containing a single `:` character.

**Signature**

```ts
export declare const colon: Doc<never>
```

Added in v1.0.0

## comma

A document containing a single `,` character.

**Signature**

```ts
export declare const comma: Doc<never>
```

Added in v1.0.0

## dot

A document containing a single `.` character.

**Signature**

```ts
export declare const dot: Doc<never>
```

Added in v1.0.0

## dquote

A document containing a single `"` character.

**Signature**

```ts
export declare const dquote: Doc<never>
```

Added in v1.0.0

## empty

The `empty` document behaves like a document containing the empty string
(`""`), so it has a height of `1`.

This may lead to surprising behavior if the empty document is expected to
bear no weight inside certain layout functions, such as`vcat`, where it will
render an empty line of output.

**Signature**

```ts
export declare const empty: Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc = Doc.vsep([
  Doc.text('hello'),
  // `parentheses` for visibility purposes only
  Doc.parenthesized(Doc.empty),
  Doc.text('world'),
])

const expected = `|hello
                  |()
                  |world`

assert.strictEqual(Render.prettyDefault(doc), String.stripMargin(expected))
```

Added in v1.0.0

## equalSign

A document containing a single `=` character.

**Signature**

```ts
export declare const equalSign: Doc<never>
```

Added in v1.0.0

## fail

The `fail` document is a document that cannot be rendered.

Generally occurs when flattening a line. The layout algorithms will reject
this document and choose a more suitable rendering.

**Signature**

```ts
export declare const fail: Doc<never>
```

Added in v1.0.0

## hardLine

The `hardLine` document is always laid out as a line break, regardless of
space or whether or not the document was `group`"ed.

**Signature**

```ts
export declare const hardLine: Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hcat([Doc.text('lorem ipsum'), Doc.hardLine, Doc.text('dolor sit amet')])

// Even with enough space, a line break is introduced
assert.strictEqual(
  Render.pretty(doc, { lineWidth: 1000 }),
  String.stripMargin(
    `|lorem ipsum
     |dolor sit amet`
  )
)
```

Added in v1.0.0

## langle

A document containing a single `<` character.

**Signature**

```ts
export declare const langle: Doc<never>
```

Added in v1.0.0

## lbrace

A document containing a single `{` character.

**Signature**

```ts
export declare const lbrace: Doc<never>
```

Added in v1.0.0

## lbracket

A document containing a single `[` character.

**Signature**

```ts
export declare const lbracket: Doc<never>
```

Added in v1.0.0

## line

The `line` document advances to the next line and indents to the current
nesting level. However, `line` will behave like `space` if the line break is
undone by `group`.

**Signature**

```ts
export declare const line: Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hcat([Doc.text('lorem ipsum'), Doc.line, Doc.text('dolor sit amet')])

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|lorem ipsum
     |dolor sit amet`
  )
)
assert.strictEqual(Render.prettyDefault(Doc.group(doc)), 'lorem ipsum dolor sit amet')
```

Added in v1.0.0

## lineBreak

The `lineBreak` document is like `line` but behaves like `empty` if the line
break is undone by `group` (instead of `space`).

**Signature**

```ts
export declare const lineBreak: Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hcat([Doc.text('lorem ipsum'), Doc.lineBreak, Doc.text('dolor sit amet')])

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|lorem ipsum
     |dolor sit amet`
  )
)
assert.strictEqual(Render.prettyDefault(Doc.group(doc)), 'lorem ipsumdolor sit amet')
```

Added in v1.0.0

## lparen

A document containing a single `(` character.

**Signature**

```ts
export declare const lparen: Doc<never>
```

Added in v1.0.0

## rangle

A document containing a single `>` character.

**Signature**

```ts
export declare const rangle: Doc<never>
```

Added in v1.0.0

## rbrace

A document containing a single `}` character.

**Signature**

```ts
export declare const rbrace: Doc<never>
```

Added in v1.0.0

## rbracket

A document containing a single `]` character.

**Signature**

```ts
export declare const rbracket: Doc<never>
```

Added in v1.0.0

## rparen

A document containing a single `)` character.

**Signature**

```ts
export declare const rparen: Doc<never>
```

Added in v1.0.0

## semi

A document containing a single `;` character.

**Signature**

```ts
export declare const semi: Doc<never>
```

Added in v1.0.0

## slash

A document containing a single `/` character.

**Signature**

```ts
export declare const slash: Doc<never>
```

Added in v1.0.0

## softLine

The `softLine` document behaves like `space` if the resulting output fits
onto the page, otherwise it behaves like `line`.

**Signature**

```ts
export declare const softLine: Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hcat([Doc.text('lorem ipsum'), Doc.softLine, Doc.text('dolor sit amet')])

// Here we have enough space to put everything onto one line
assert.strictEqual(Render.pretty(doc, { lineWidth: 80 }), 'lorem ipsum dolor sit amet')

// If the page width is narrowed to `10`, the layout algorithm will
// introduce a line break
assert.strictEqual(
  Render.pretty(Doc.group(doc), { lineWidth: 10 }),
  String.stripMargin(
    `|lorem ipsum
     |dolor sit amet`
  )
)
```

Added in v1.0.0

## softLineBreak

The `softLineBreak` document is similar to `softLine`, but behaves like
`empty` if the resulting output does not fit onto the page (instead of
`space`).

**Signature**

```ts
export declare const softLineBreak: Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hcat([Doc.text('ThisText'), Doc.softLineBreak, Doc.text('IsWayTooLong')])

// With enough space, we get direct concatenation of documents:
assert.strictEqual(Render.pretty(doc, { lineWidth: 80 }), 'ThisTextIsWayTooLong')

// If the page width is narrowed to `10`, the layout algorithm will
// introduce a line break
assert.strictEqual(
  Render.pretty(Doc.group(doc), { lineWidth: 10 }),
  String.stripMargin(
    `|ThisText
     |IsWayTooLong`
  )
)
```

Added in v1.0.0

## space

A document containing a single ` ` character.

**Signature**

```ts
export declare const space: Doc<never>
```

Added in v1.0.0

## squote

A document containing a single `"` character.

**Signature**

```ts
export declare const squote: Doc<never>
```

Added in v1.0.0

## vbar

A document containing a single `|` character.

**Signature**

```ts
export declare const vbar: Doc<never>
```

Added in v1.0.0

# reactive layouts

## column

Lays out a document depending upon the column at which the document starts.

**Signature**

```ts
export declare const column: <A>(react: (position: number) => Doc<A>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

// Example 1:
const example1 = Doc.column((l) => Doc.hsep([Doc.text('Columns are'), Doc.text(`${l}-based`)]))

assert.strictEqual(Render.prettyDefault(example1), 'Columns are 0-based')

// Example 2:
const doc = Doc.hsep([Doc.text('prefix'), Doc.column((l) => Doc.text(`| <- column ${l}`))])

const example2 = Doc.vsep([0, 4, 8].map((n) => Doc.indent(n)(doc)))

assert.strictEqual(
  Render.prettyDefault(example2),
  String.stripMargin(
    `|prefix | <- column 7
     |    prefix | <- column 11
     |        prefix | <- column 15`
  )
)
```

Added in v1.0.0

## nesting

Lays out a document depending upon the current nesting level (i.e., the
current indentation of the document).

**Signature**

```ts
export declare const nesting: <A>(react: (level: number) => Doc<A>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc = Doc.hsep([Doc.text('prefix'), Doc.nesting((l) => Doc.squareBracketed(Doc.text(`Nested: ${l}`)))])

const example = Doc.vsep([0, 4, 8].map((n) => Doc.indent(n)(doc)))

assert.strictEqual(
  Render.prettyDefault(example),
  String.stripMargin(
    `|prefix [Nested: 0]
     |    prefix [Nested: 4]
     |        prefix [Nested: 8]`
  )
)
```

Added in v1.0.0

## width

The `width` combinator makes the column width of a document available to the
document while rendering.

**Signature**

```ts
export declare const width: {
  <A, B>(react: (width: number) => Doc<B>): (self: Doc<A>) => Doc<A | B>
  <A, B>(self: Doc<A>, react: (width: number) => Doc<B>): Doc<A | B>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const annotate = <A>(doc: Doc.Doc<A>): Doc.Doc<A> =>
  pipe(
    Doc.squareBracketed(doc),
    Doc.width((w) => Doc.text(` <- width: ${w}`))
  )

const docs = [
  Doc.text('---'),
  Doc.text('------'),
  Doc.indent(Doc.text('---'), 3),
  Doc.vsep([Doc.text('---'), Doc.indent(Doc.text('---'), 4)]),
]

const doc = Doc.align(Doc.vsep(docs.map(annotate)))

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|[---] <- width: 5
     |[------] <- width: 8
     |[   ---] <- width: 8
     |[---
     |    ---] <- width: 8`
  )
)
```

Added in v1.0.0

# refinements

## isAnnotated

Returns `true` if the specified `Doc` is a `Annotated`, `false` otherwise.

**Signature**

```ts
export declare const isAnnotated: <A>(self: Doc<A>) => self is Annotated<A>
```

Added in v1.0.0

## isCat

Returns `true` if the specified `Doc` is a `Cat`, `false` otherwise.

**Signature**

```ts
export declare const isCat: <A>(self: Doc<A>) => self is Cat<A>
```

Added in v1.0.0

## isChar

Returns `true` if the specified `Doc` is a `Char`, `false` otherwise.

**Signature**

```ts
export declare const isChar: <A>(self: Doc<A>) => self is Char<A>
```

Added in v1.0.0

## isColumn

Returns `true` if the specified `Doc` is a `Column`, `false` otherwise.

**Signature**

```ts
export declare const isColumn: <A>(self: Doc<A>) => self is Column<A>
```

Added in v1.0.0

## isDoc

Returns `true` if the specified value is a `Doc`, `false` otherwise.

**Signature**

```ts
export declare const isDoc: (u: unknown) => u is Doc<unknown>
```

Added in v1.0.0

## isEmpty

Returns `true` if the specified `Doc` is an `Empty`, `false` otherwise.

**Signature**

```ts
export declare const isEmpty: <A>(self: Doc<A>) => self is Empty<A>
```

Added in v1.0.0

## isFail

Returns `true` if the specified `Doc` is a `Fail`, `false` otherwise.

**Signature**

```ts
export declare const isFail: <A>(self: Doc<A>) => self is Fail<A>
```

Added in v1.0.0

## isFlatAlt

Returns `true` if the specified `Doc` is a `FlatAlt`, `false` otherwise.

**Signature**

```ts
export declare const isFlatAlt: <A>(self: Doc<A>) => self is FlatAlt<A>
```

Added in v1.0.0

## isLine

Returns `true` if the specified `Doc` is a `Line`, `false` otherwise.

**Signature**

```ts
export declare const isLine: <A>(self: Doc<A>) => self is Line<A>
```

Added in v1.0.0

## isNest

Returns `true` if the specified `Doc` is a `Nest`, `false` otherwise.

**Signature**

```ts
export declare const isNest: <A>(self: Doc<A>) => self is Nest<A>
```

Added in v1.0.0

## isNesting

Returns `true` if the specified `Doc` is a `Nesting`, `false` otherwise.

**Signature**

```ts
export declare const isNesting: <A>(self: Doc<A>) => self is Nesting<A>
```

Added in v1.0.0

## isText

Returns `true` if the specified `Doc` is a `Text`, `false` otherwise.

**Signature**

```ts
export declare const isText: <A>(self: Doc<A>) => self is Text<A>
```

Added in v1.0.0

## isUnion

Returns `true` if the specified `Doc` is a `Union`, `false` otherwise.

**Signature**

```ts
export declare const isUnion: <A>(self: Doc<A>) => self is Union<A>
```

Added in v1.0.0

## isWithPageWidth

Returns `true` if the specified `Doc` is a `WithPageWidth`, `false` otherwise.

**Signature**

```ts
export declare const isWithPageWidth: <A>(self: Doc<A>) => self is WithPageWidth<A>
```

Added in v1.0.0

# separation

## fillSep

The `fillSep` combinator concatenates all documents in a collection
horizontally by placing a `space` between each pair of documents as long as
they fit the page. Once the page width is exceeded, a `line` is inserted and
the process is repeated for all documents in the collection.

**Note**: the use of `line` means that if `group`ed, the documents will be
separated with a `space` instead of newlines. See `fillCat` if you do not
want a `space`.

**Signature**

```ts
export declare const fillSep: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

Added in v1.0.0

## hsep

The `hsep` combinator concatenates all documents in a collection horizontally
by placing a `space` between each pair of documents.

For automatic line breaks, consider using `fillSep`.

**Signature**

```ts
export declare const hsep: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'

const doc: Doc.Doc<never> = Doc.hsep(Doc.words('lorem ipsum dolor sit amet'))

assert.strictEqual(Render.pretty(doc, { lineWidth: 80 }), 'lorem ipsum dolor sit amet')

// The `hsep` combinator will not introduce line breaks on its own, even when
// the page is too narrow
assert.strictEqual(Render.pretty(doc, { lineWidth: 5 }), 'lorem ipsum dolor sit amet')
```

Added in v1.0.0

## seps

The `seps` combinator will attempt to lay out a collection of documents
separated by `space`s. If the output does not fit the page, then the
documents will be separated by newlines. This is what differentiates it from
`vsep`, which always lays out documents beneath one another.

**Signature**

```ts
export declare const seps: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc: Doc.Doc<never> = Doc.hsep([Doc.text('prefix'), Doc.seps(Doc.words('text to lay out'))])

assert.strictEqual(Render.prettyDefault(doc), 'prefix text to lay out')

// If the page width is too narrow, documents are separated by newlines
assert.strictEqual(
  Render.pretty(doc, { lineWidth: 20 }),
  String.stripMargin(
    `|prefix text
     |to
     |lay
     |out`
  )
)
```

Added in v1.0.0

## vsep

The `vsep` combinator concatenates all documents in a collection vertically.
If a `group` undoes the line breaks inserted by `vsep`, the documents are
separated with a space instead.

When a `vsep` is `group`ed, the documents are separated with a `space` if the
layoutfits the page, otherwise nothing is done. See the `sep` convenience
function for this use case.

**Signature**

```ts
export declare const vsep: <A>(docs: Iterable<Doc<A>>) => Doc<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const unaligned = Doc.hsep([Doc.text('prefix'), Doc.vsep(Doc.words('text to lay out'))])

assert.strictEqual(
  Render.prettyDefault(unaligned),
  String.stripMargin(
    `|prefix text
     |to
     |lay
     |out`
  )
)

// The `align` function can be used to align the documents under their first
// element
const aligned = Doc.hsep([Doc.text('prefix'), Doc.align(Doc.vsep(Doc.words('text to lay out')))])

assert.strictEqual(
  Render.prettyDefault(aligned),
  String.stripMargin(
    `|prefix text
     |       to
     |       lay
     |       out`
  )
)
```

Added in v1.0.0

# symbol

## DocTypeId

**Signature**

```ts
export declare const DocTypeId: typeof DocTypeId
```

Added in v1.0.0

## DocTypeId (type alias)

**Signature**

```ts
export type DocTypeId = typeof DocTypeId
```

Added in v1.0.0

# utilities

## angleBracketed

Encloses the input document in angle brackets (`<>`).

**Signature**

```ts
export declare const angleBracketed: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## curlyBraced

Encloses the input document in curly braces (`{}`).

**Signature**

```ts
export declare const curlyBraced: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## doubleQuoted

Encloses the input document in double quotes (`""`).

**Signature**

```ts
export declare const doubleQuoted: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## parenthesized

Encloses the input document in parentheses (`()`).

**Signature**

```ts
export declare const parenthesized: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## punctuate

The `punctuate` combinator appends the `punctuator` document to all but the
last document in a collection of documents. The separators are places after
the document entries, which can be observed if the result is oriented
vertically.

**Signature**

```ts
export declare const punctuate: {
  <A, B>(punctuator: Doc<A>): (docs: Iterable<Doc<B>>) => readonly Doc<A | B>[]
  <A, B>(docs: Iterable<Doc<B>>, punctuator: Doc<A>): readonly Doc<A | B>[]
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'
import * as String from 'effect/String'

const docs = pipe(Doc.words('lorem ipsum dolor sit amet'), Doc.punctuate(Doc.comma))

assert.strictEqual(Render.prettyDefault(Doc.hsep(docs)), 'lorem, ipsum, dolor, sit, amet')

// The separators are put at the end of the entries, which can be better
// visualzied if the documents are rendered vertically
assert.strictEqual(
  Render.prettyDefault(Doc.vsep(docs)),
  String.stripMargin(
    `|lorem,
     |ipsum,
     |dolor,
     |sit,
     |amet`
  )
)
```

Added in v1.0.0

## reflow

Splits a string of words into individual `Text` documents using the specified
`char` to split on (defaults to `" "`). In addition, a `softLine` is inserted
in between each word so that if the text exceeds the available width it will
be broken into multiple lines.

**Signature**

```ts
export declare const reflow: (s: string, char?: string) => Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import * as String from 'effect/String'

const doc = Doc.reflow(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
)

assert.strictEqual(
  Render.pretty(doc, { lineWidth: 32 }),
  String.stripMargin(
    `|Lorem ipsum dolor sit amet,
     |consectetur adipisicing elit,
     |sed do eiusmod tempor incididunt
     |ut labore et dolore magna
     |aliqua.`
  )
)
```

Added in v1.0.0

## singleQuoted

Encloses the input document in single quotes (`""`).

**Signature**

```ts
export declare const singleQuoted: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## spaces

The `spaces` combinator lays out a document containing `n` spaces. Negative
values for `n` count as `0` spaces.

**Signature**

```ts
export declare const spaces: (n: number) => Doc<never>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'

const doc = Doc.squareBracketed(Doc.doubleQuoted(Doc.spaces(5)))

assert.strictEqual(Render.prettyDefault(doc), '["     "]')
```

Added in v1.0.0

## squareBracketed

Encloses the input document in square brackets (`[]`).

**Signature**

```ts
export declare const squareBracketed: <A>(self: Doc<A>) => Doc<A>
```

Added in v1.0.0

## surround

The `surround` combinator encloses a document in between `left` and `right`
documents.

**Signature**

```ts
export declare const surround: {
  <A, B, C>(left: Doc<A>, right: Doc<B>): (self: Doc<C>) => Doc<A | B | C>
  <A, B, C>(self: Doc<C>, left: Doc<A>, right: Doc<B>): Doc<A | B | C>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from 'effect/Function'

const doc = pipe(Doc.char('-'), Doc.surround(Doc.char('A'), Doc.char('Z')))

assert.strictEqual(Render.prettyDefault(doc), 'A-Z')
```

Added in v1.0.0

## textSpaces

**Signature**

```ts
export declare const textSpaces: (n: number) => string
```

Added in v1.0.0

## words

Splits a string of words into individual `Text` documents using the
specified `char` to split on (defaults to `" "`).

**Signature**

```ts
export declare const words: (s: string, char?: string) => ReadonlyArray<Doc<never>>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'

const doc = Doc.tupled(Doc.words('lorem ipsum dolor'))

assert.strictEqual(Render.prettyDefault(doc), '(lorem, ipsum, dolor)')
```

Added in v1.0.0

# utils

## Doc (namespace)

Added in v1.0.0

### Variance (interface)

**Signature**

```ts
export interface Variance<A> extends Equal {
  readonly [DocTypeId]: {
    readonly _A: () => A
  }
}
```

Added in v1.0.0

### TypeLambda (type alias)

**Signature**

```ts
export type TypeLambda = DocTypeLambda
```

Added in v1.0.0
