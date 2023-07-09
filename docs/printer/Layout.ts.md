---
title: Layout.ts
nav_order: 6
parent: "@effect/printer"
---

## Layout overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [defaultOptions](#defaultoptions)
  - [options](#options)
- [layout algorithms](#layout-algorithms)
  - [compact](#compact)
  - [pretty](#pretty)
  - [smart](#smart)
  - [unbounded](#unbounded)
  - [wadlerLeijen](#wadlerleijen)
- [model](#model)
  - [Layout (interface)](#layout-interface)

---

# constructors

## defaultOptions

The default layout options, which are suitable when you want to obtain output
but do not care about the details.

**Signature**

```ts
export declare const defaultOptions: Layout.Options
```

Added in v1.0.0

## options

**Signature**

```ts
export declare const options: (pageWidth: PageWidth) => Layout.Options
```

Added in v1.0.0

# layout algorithms

## compact

A layout algorithm which will lay out a document without adding any
indentation and without preserving annotations.

Since no pretty-printing is involved, this layout algorithm is very fast. The
resulting output contains fewer characters than a pretty-printed version and
can be used for output that is read by other programs.

**Signature**

```ts
export declare const compact: <A>(self: Doc<A>) => DocStream<A>
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import * as Render from '@effect/printer/Render'
import { pipe } from '@effect/data/Function'
import * as String from '@effect/data/String'

const doc = pipe(
  Doc.vsep([Doc.text('lorem'), Doc.text('ipsum'), pipe(Doc.vsep([Doc.text('dolor'), Doc.text('sit')]), Doc.hang(4))]),
  Doc.hang(4)
)

assert.strictEqual(
  Render.prettyDefault(doc),
  String.stripMargin(
    `|lorem
     |    ipsum
     |    dolor
     |        sit`
  )
)

assert.strictEqual(
  Render.compact(doc),
  String.stripMargin(
    `|lorem
     |ipsum
     |dolor
     |sit`
  )
)
```

Added in v1.0.0

## pretty

The `pretty` layout algorithm is the default algorithm for rendering
documents.

`pretty` commits to rendering something in a certain way if the next
element fits the layout constrants. In other words, it has one `DocStream`
element lookahead when rendering.

Consider using the smarter, but slightly less performant `smart`
algorithm if the results seem to run off to the right before having lots of
line breaks.

**Signature**

```ts
export declare const pretty: {
  (options: Layout.Options): <A>(self: Doc<A>) => DocStream<A>
  <A>(self: Doc<A>, options: Layout.Options): DocStream<A>
}
```

Added in v1.0.0

## smart

A layout algorithm with more look ahead than `pretty`, which will introduce
line breaks into a document earlier if the content does not, or will not, fit
onto one line.

**Signature**

```ts
export declare const smart: {
  (options: Layout.Options): <A>(self: Doc<A>) => DocStream<A>
  <A>(self: Doc<A>, options: Layout.Options): DocStream<A>
}
```

**Example**

```ts
import * as Doc from '@effect/printer/Doc'
import type * as DocStream from '@effect/printer/DocStream'
import * as Layout from '@effect/printer/Layout'
import * as PageWidth from '@effect/printer/PageWidth'
import * as Render from '@effect/printer/Render'
import { pipe } from '@effect/data/Function'
import * as String from '@effect/data/String'

// Consider the following python-ish document:
const fun = <A>(doc: Doc.Doc<A>): Doc.Doc<A> =>
  Doc.hcat([pipe(Doc.hcat([Doc.text('fun('), Doc.softLineBreak, doc]), Doc.hang(2)), Doc.text(')')])

const funs = <A>(doc: Doc.Doc<A>): Doc.Doc<A> => pipe(doc, fun, fun, fun, fun, fun)

const doc = funs(Doc.align(Doc.list(Doc.words('abcdef ghijklm'))))

// The document will be rendered using the following pipeline, where the choice
// of layout algorithm has been left open:
const pageWidth = PageWidth.availablePerLine(26, 1)
const layoutOptions = Layout.options(pageWidth)
const dashes = Doc.text(Array.from({ length: 26 - 2 }, () => '-').join(''))
const hr = Doc.hcat([Doc.vbar, dashes, Doc.vbar])

const render =
  <A>(doc: Doc.Doc<A>) =>
  (layoutAlgorithm: (options: Layout.Layout.Options) => (doc: Doc.Doc<A>) => DocStream.DocStream<A>): string =>
    pipe(Doc.vsep([hr, doc, hr]), layoutAlgorithm(layoutOptions), Render.render)

// If rendered using `Layout.pretty`, with a page width of `26` characters per line,
// all the calls to `fun` will fit into the first line. However, this exceeds the
// desired `26` character page width.
assert.strictEqual(
  render(doc)(Layout.pretty),
  String.stripMargin(
    `||------------------------|
     |fun(fun(fun(fun(fun(
     |                  [ abcdef
     |                  , ghijklm ])))))
     ||------------------------|`
  )
)

// The same document, rendered with `Layout.smart`, fits the layout contstraints:
assert.strictEqual(
  render(doc)(Layout.smart),
  String.stripMargin(
    `||------------------------|
     |fun(
     |  fun(
     |    fun(
     |      fun(
     |        fun(
     |          [ abcdef
     |          , ghijklm ])))))
     ||------------------------|`
  )
)

// The key difference between `Layout.pretty` and `Layout.smart` is that the
// latter will check the potential document until it encounters a line with the
// same indentation or less than the start of the document. Any line encountered
// earlier is assumed to belong to the same syntactic structure. In contrast,
// `Layout.pretty` checks only the first line.

// Consider for example the question of whether the `A`s fit into the document
// below:
// > 1 A
// > 2   A
// > 3  A
// > 4 B
// > 5   B

// `pretty` will check only the first line, ignoring whether the second line
// may already be too wide. In contrast, `Layout.smart` stops only once it reaches
// the fourth line 4, where the `B` has the same indentation as the first `A`.
```

Added in v1.0.0

## unbounded

The `unbounded` layout algorithm will lay out a document an `Unbounded`
page width.

**Signature**

```ts
export declare const unbounded: <A>(self: Doc<A>) => DocStream<A>
```

Added in v1.0.0

## wadlerLeijen

**Signature**

```ts
export declare const wadlerLeijen: {
  <A>(fits: Layout.FittingPredicate<A>, options: Layout.Options): (self: Doc<A>) => DocStream<A>
  <A>(self: Doc<A>, fits: Layout.FittingPredicate<A>, options: Layout.Options): DocStream<A>
}
```

Added in v1.0.0

# model

## Layout (interface)

**Signature**

```ts
export interface Layout<A> {
  (options: Layout.Options): DocStream<A>
}
```

Added in v1.0.0
