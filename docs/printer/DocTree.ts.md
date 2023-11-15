---
title: DocTree.ts
nav_order: 3
parent: "@effect/printer"
---

## DocTree overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [annotations](#annotations)
  - [alterAnnotations](#alterannotations)
  - [reAnnotate](#reannotate)
  - [unAnnotate](#unannotate)
- [constructors](#constructors)
  - [annotation](#annotation)
  - [char](#char)
  - [concat](#concat)
  - [empty](#empty)
  - [line](#line)
  - [text](#text)
- [conversions](#conversions)
  - [treeForm](#treeform)
- [folding](#folding)
  - [foldMap](#foldmap)
- [instances](#instances)
  - [Covariant](#covariant)
  - [Invariant](#invariant)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [model](#model)
  - [AnnotationTree (interface)](#annotationtree-interface)
  - [CharTree (interface)](#chartree-interface)
  - [ConcatTree (interface)](#concattree-interface)
  - [DocTree (type alias)](#doctree-type-alias)
  - [DocTreeTypeLambda (interface)](#doctreetypelambda-interface)
  - [EmptyTree (interface)](#emptytree-interface)
  - [LineTree (interface)](#linetree-interface)
  - [TextTree (interface)](#texttree-interface)
- [refinements](#refinements)
  - [isAnnotationTree](#isannotationtree)
  - [isCharTree](#ischartree)
  - [isConcatTree](#isconcattree)
  - [isDocTree](#isdoctree)
  - [isEmptyTree](#isemptytree)
  - [isLineTree](#islinetree)
  - [isTextTree](#istexttree)
- [rendering](#rendering)
  - [renderSimplyDecorated](#rendersimplydecorated)
- [symbol](#symbol)
  - [DocTreeTypeId](#doctreetypeid)
  - [DocTreeTypeId (type alias)](#doctreetypeid-type-alias)
- [utils](#utils)
  - [DocTree (namespace)](#doctree-namespace)
    - [Variance (interface)](#variance-interface)
    - [TypeLambda (type alias)](#typelambda-type-alias)

---

# annotations

## alterAnnotations

Change the annotation of a document to a different annotation, or none at
all.

**Signature**

```ts
export declare const alterAnnotations: {
  <A, B>(f: (a: A) => Iterable<B>): (self: DocTree<A>) => DocTree<B>
  <A, B>(self: DocTree<A>, f: (a: A) => Iterable<B>): DocTree<B>
}
```

Added in v1.0.0

## reAnnotate

Change the annotation of a `DocTree`.

**Signature**

```ts
export declare const reAnnotate: {
  <A, B>(f: (a: A) => B): (self: DocTree<A>) => DocTree<B>
  <A, B>(self: DocTree<A>, f: (a: A) => B): DocTree<B>
}
```

Added in v1.0.0

## unAnnotate

Remove all annotations from a `DocTree`.

**Signature**

```ts
export declare const unAnnotate: <A>(self: DocTree<A>) => DocTree<never>
```

Added in v1.0.0

# constructors

## annotation

Annotate the specified `DocTree` with an annotation of type `A`.

**Signature**

```ts
export declare const annotation: {
  <A>(annotation: A): <B>(self: DocTree<B>) => DocTree<A | B>
  <A, B>(self: DocTree<A>, annotation: B): DocTree<A | B>
}
```

Added in v1.0.0

## char

**Signature**

```ts
export declare const char: <A>(char: string) => DocTree<A>
```

Added in v1.0.0

## concat

Horizontally concatenates multiple `DocTree`s.

**Signature**

```ts
export declare const concat: <A>(trees: readonly DocTree<A>[]) => DocTree<A>
```

Added in v1.0.0

## empty

**Signature**

```ts
export declare const empty: DocTree<never>
```

Added in v1.0.0

## line

**Signature**

```ts
export declare const line: <A>(indentation: number) => DocTree<A>
```

Added in v1.0.0

## text

**Signature**

```ts
export declare const text: <A>(text: string) => DocTree<A>
```

Added in v1.0.0

# conversions

## treeForm

Converts a `DocStream<A>` into a `DocTree<A>`.

**Signature**

```ts
export declare const treeForm: <A>(stream: DocStream.DocStream<A>) => DocTree<A>
```

Added in v1.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: {
  <A, M>(M: monoid.Monoid<M>, f: (a: A) => M): (self: DocTree<A>) => M
  <A, M>(self: DocTree<A>, M: monoid.Monoid<M>, f: (a: A) => M): M
}
```

Added in v1.0.0

# instances

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<DocTreeTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<DocTreeTypeLambda>
```

Added in v1.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>(_: void) => monoid.Monoid<DocTree<A>>
```

Added in v1.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>(_: void) => semigroup.Semigroup<DocTree<A>>
```

Added in v1.0.0

# model

## AnnotationTree (interface)

**Signature**

```ts
export interface AnnotationTree<A> extends DocTree.Variance<A> {
  readonly _tag: "AnnotationTree"
  readonly annotation: A
  readonly tree: DocTree<A>
}
```

Added in v1.0.0

## CharTree (interface)

**Signature**

```ts
export interface CharTree<A> extends DocTree.Variance<A> {
  readonly _tag: "CharTree"
  readonly char: string
}
```

Added in v1.0.0

## ConcatTree (interface)

**Signature**

```ts
export interface ConcatTree<A> extends DocTree.Variance<A> {
  readonly _tag: "ConcatTree"
  readonly trees: ReadonlyArray<DocTree<A>>
}
```

Added in v1.0.0

## DocTree (type alias)

Represents a document that has been laid out into a tree-like structure.

A `DocStream` is a linked list of different annotated cons cells (i.e.
`TextStream` and then some further `DocStream`, `LineStream` and then some
further `DocStream`, etc.). The `DocStream` format is quite suitable as a
target for a layout engine, but is not suitable for rendering to a more
structured format, such as HTML, where we do not want to perform a lookahead
until the end of some pre-defined markup. These formats would benefit more
from a tree-like structure that explicitly marks its contents as annotated.
A `DocTree` is therefore much more suitable for this use case.

**Signature**

```ts
export type DocTree<A> = EmptyTree<A> | CharTree<A> | TextTree<A> | LineTree<A> | AnnotationTree<A> | ConcatTree<A>
```

Added in v1.0.0

## DocTreeTypeLambda (interface)

**Signature**

```ts
export interface DocTreeTypeLambda extends TypeLambda {
  readonly type: DocTree<this["Target"]>
}
```

Added in v1.0.0

## EmptyTree (interface)

**Signature**

```ts
export interface EmptyTree<A> extends DocTree.Variance<A> {
  readonly _tag: "EmptyTree"
}
```

Added in v1.0.0

## LineTree (interface)

**Signature**

```ts
export interface LineTree<A> extends DocTree.Variance<A> {
  readonly _tag: "LineTree"
  readonly indentation: number
}
```

Added in v1.0.0

## TextTree (interface)

**Signature**

```ts
export interface TextTree<A> extends DocTree.Variance<A> {
  readonly _tag: "TextTree"
  readonly text: string
}
```

Added in v1.0.0

# refinements

## isAnnotationTree

Returns `true` if the specified `DocTree` is an `AnnotationTree`, `false` otherwise.

**Signature**

```ts
export declare const isAnnotationTree: <A>(self: DocTree<A>) => self is AnnotationTree<A>
```

Added in v1.0.0

## isCharTree

Returns `true` if the specified `DocTree` is an `CharTree`, `false` otherwise.

**Signature**

```ts
export declare const isCharTree: <A>(self: DocTree<A>) => self is CharTree<A>
```

Added in v1.0.0

## isConcatTree

Returns `true` if the specified `DocTree` is an `ConcatTree`, `false` otherwise.

**Signature**

```ts
export declare const isConcatTree: <A>(self: DocTree<A>) => self is ConcatTree<A>
```

Added in v1.0.0

## isDocTree

Returns `true` if the specified value is a `DocTree`, `false` otherwise.

**Signature**

```ts
export declare const isDocTree: (u: unknown) => u is DocTree<unknown>
```

Added in v1.0.0

## isEmptyTree

Returns `true` if the specified `DocTree` is an `EmptyTree`, `false` otherwise.

**Signature**

```ts
export declare const isEmptyTree: <A>(self: DocTree<A>) => self is EmptyTree<A>
```

Added in v1.0.0

## isLineTree

Returns `true` if the specified `DocTree` is an `LineTree`, `false` otherwise.

**Signature**

```ts
export declare const isLineTree: <A>(self: DocTree<A>) => self is LineTree<A>
```

Added in v1.0.0

## isTextTree

Returns `true` if the specified `DocTree` is an `TextTree`, `false` otherwise.

**Signature**

```ts
export declare const isTextTree: <A>(self: DocTree<A>) => self is TextTree<A>
```

Added in v1.0.0

# rendering

## renderSimplyDecorated

The simplest possible tree-based renderer.

For example, here is a document annotated with `void` and thee behavior is
to surround annotated regions with »>>>« and »<<<«.

**Signature**

```ts
export declare const renderSimplyDecorated: {
  <A, M>(
    M: monoid.Monoid<M>,
    renderText: (text: string) => M,
    renderAnnotation: (annotation: A, out: M) => M
  ): (self: DocTree<A>) => M
  <A, M>(
    self: DocTree<A>,
    M: monoid.Monoid<M>,
    renderText: (text: string) => M,
    renderAnnotation: (annotation: A, out: M) => M
  ): M
}
```

**Example**

```ts
import * as Doc from "@effect/printer/Doc"
import * as DocTree from "@effect/printer/DocTree"
import * as Layout from "@effect/printer/Layout"
import { identity, pipe } from "effect/Function"
import * as String from "@effect/typeclass/data/String"

const doc: Doc.Doc<void> = Doc.hsep([
  Doc.text("hello"),
  pipe(Doc.text("world"), Doc.annotate(undefined), Doc.cat(Doc.char("!")))
])

const tree = DocTree.treeForm(Layout.pretty(Layout.defaultOptions)(doc))

const rendered = pipe(
  tree,
  DocTree.renderSimplyDecorated(String.Monoid, identity, (_, x) => `>>>${x}<<<`)
)

assert.strictEqual(rendered, "hello >>>world<<<!")
```

Added in v1.0.0

# symbol

## DocTreeTypeId

**Signature**

```ts
export declare const DocTreeTypeId: typeof DocTreeTypeId
```

Added in v1.0.0

## DocTreeTypeId (type alias)

**Signature**

```ts
export type DocTreeTypeId = typeof DocTreeTypeId
```

Added in v1.0.0

# utils

## DocTree (namespace)

Added in v1.0.0

### Variance (interface)

**Signature**

```ts
export interface Variance<A> extends Equal {
  readonly [DocTreeTypeId]: {
    readonly _A: (_: never) => A
  }
}
```

Added in v1.0.0

### TypeLambda (type alias)

**Signature**

```ts
export type TypeLambda = DocTreeTypeLambda
```

Added in v1.0.0
