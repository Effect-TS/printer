---
title: DocStream.ts
nav_order: 2
parent: Modules
---

## DocStream overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [annotations](#annotations)
  - [alterAnnotations](#alterannotations)
  - [reAnnotate](#reannotate)
  - [unAnnotate](#unannotate)
- [constructors](#constructors)
  - [char](#char)
  - [empty](#empty)
  - [failed](#failed)
  - [line](#line)
  - [popAnnotation](#popannotation)
  - [pushAnnotation](#pushannotation)
  - [text](#text)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [match](#match)
- [instances](#instances)
  - [Functor](#functor)
  - [Invariant](#invariant)
- [mapping](#mapping)
  - [map](#map)
- [model](#model)
  - [CharStream (interface)](#charstream-interface)
  - [DocStream (type alias)](#docstream-type-alias)
  - [DocStreamTypeLambda (interface)](#docstreamtypelambda-interface)
  - [EmptyStream (interface)](#emptystream-interface)
  - [FailedStream (interface)](#failedstream-interface)
  - [LineStream (interface)](#linestream-interface)
  - [PopAnnotationStream (interface)](#popannotationstream-interface)
  - [PushAnnotationStream (interface)](#pushannotationstream-interface)
  - [TextStream (interface)](#textstream-interface)
- [refinements](#refinements)
  - [isCharStream](#ischarstream)
  - [isDocStream](#isdocstream)
  - [isEmptyStream](#isemptystream)
  - [isFailedStream](#isfailedstream)
  - [isLineStream](#islinestream)
  - [isPopAnnotationStream](#ispopannotationstream)
  - [isPushAnnotationStream](#ispushannotationstream)
  - [isTextStream](#istextstream)
- [symbol](#symbol)
  - [DocStreamTypeId](#docstreamtypeid)
  - [DocStreamTypeId (type alias)](#docstreamtypeid-type-alias)
- [utils](#utils)
  - [DocStream (namespace)](#docstream-namespace)
    - [Variance (interface)](#variance-interface)
    - [TypeLambda (type alias)](#typelambda-type-alias)

---

# annotations

## alterAnnotations

Changes the annotation of a document to a different annotation, or to
none at all.

**Signature**

```ts
export declare const alterAnnotations: {
  <A, B>(f: (a: A) => Option<B>): (self: DocStream<A>) => DocStream<B>
  <A, B>(self: DocStream<A>, f: (a: A) => Option<B>): DocStream<B>
}
```

Added in v1.0.0

## reAnnotate

Modify the annotations of a document.

**Signature**

```ts
export declare const reAnnotate: {
  <A, B>(f: (a: A) => B): (self: DocStream<A>) => DocStream<B>
  <A, B>(self: DocStream<A>, f: (a: A) => B): DocStream<B>
}
```

Added in v1.0.0

## unAnnotate

Remove all annotations from a document.

**Signature**

```ts
export declare const unAnnotate: <A>(self: DocStream<A>) => DocStream<never>
```

Added in v1.0.0

# constructors

## char

**Signature**

```ts
export declare const char: {
  (char: string): <A>(self: DocStream<A>) => DocStream<A>
  <A>(self: DocStream<A>, char: string): DocStream<A>
}
```

Added in v1.0.0

## empty

**Signature**

```ts
export declare const empty: DocStream<never>
```

Added in v1.0.0

## failed

**Signature**

```ts
export declare const failed: DocStream<never>
```

Added in v1.0.0

## line

**Signature**

```ts
export declare const line: {
  (indentation: number): <A>(self: DocStream<A>) => DocStream<A>
  <A>(self: DocStream<A>, indentation: number): DocStream<A>
}
```

Added in v1.0.0

## popAnnotation

**Signature**

```ts
export declare const popAnnotation: <A>(stream: DocStream<A>) => DocStream<A>
```

Added in v1.0.0

## pushAnnotation

**Signature**

```ts
export declare const pushAnnotation: {
  <B>(annotation: B): <A>(self: DocStream<A>) => DocStream<B | A>
  <A, B>(self: DocStream<A>, annotation: B): DocStream<A | B>
}
```

Added in v1.0.0

## text

**Signature**

```ts
export declare const text: {
  (text: string): <A>(self: DocStream<A>) => DocStream<A>
  <A>(self: DocStream<A>, text: string): DocStream<A>
}
```

Added in v1.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: {
  <A, M>(M: monoid.Monoid<M>, f: (a: A) => M): (self: DocStream<A>) => M
  <A, M>(self: DocStream<A>, M: monoid.Monoid<M>, f: (a: A) => M): M
}
```

Added in v1.0.0

## match

**Signature**

```ts
export declare const match: {
  <A, R>(patterns: {
    readonly FailedStream: () => R
    readonly EmptyStream: () => R
    readonly CharStream: (char: string, stream: DocStream<A>) => R
    readonly TextStream: (text: string, stream: DocStream<A>) => R
    readonly LineStream: (indentation: number, stream: DocStream<A>) => R
    readonly PushAnnotationStream: (annotation: A, stream: DocStream<A>) => R
    readonly PopAnnotationStream: (stream: DocStream<A>) => R
  }): (self: DocStream<A>) => R
  <A, R>(
    self: DocStream<A>,
    patterns: {
      readonly FailedStream: () => R
      readonly EmptyStream: () => R
      readonly CharStream: (char: string, stream: DocStream<A>) => R
      readonly TextStream: (text: string, stream: DocStream<A>) => R
      readonly LineStream: (indentation: number, stream: DocStream<A>) => R
      readonly PushAnnotationStream: (annotation: A, stream: DocStream<A>) => R
      readonly PopAnnotationStream: (stream: DocStream<A>) => R
    }
  ): R
}
```

Added in v1.0.0

# instances

## Functor

**Signature**

```ts
export declare const Functor: covariant.Covariant<DocStreamTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<DocStreamTypeLambda>
```

Added in v1.0.0

# mapping

## map

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): (self: DocStream<A>) => DocStream<B>
  <A, B>(self: DocStream<A>, f: (a: A) => B): DocStream<B>
}
```

Added in v1.0.0

# model

## CharStream (interface)

Represents a `Doc` containing a single character.

**Signature**

```ts
export interface CharStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'CharStream'
  readonly char: string
  readonly stream: DocStream<A>
}
```

Added in v1.0.0

## DocStream (type alias)

Represents a document that has been laid out and can be processed used by the
rendering algorithms.

A simplified view is that a `Doc` is equivalent to an array of `DocStream`,
and the layout algorithms simply pick a `DocStream` based upon which instance
best fits the layout constraints. Therefore, a `DocStream` has all complexity
contained in a `Doc` resolved, making it very easy to convert to other
formats, such as plaintext or terminal output.

**Signature**

```ts
export type DocStream<A> =
  | FailedStream<A>
  | EmptyStream<A>
  | CharStream<A>
  | TextStream<A>
  | LineStream<A>
  | PushAnnotationStream<A>
  | PopAnnotationStream<A>
```

Added in v1.0.0

## DocStreamTypeLambda (interface)

**Signature**

```ts
export interface DocStreamTypeLambda extends TypeLambda {
  readonly type: DocStream<this['Target']>
}
```

Added in v1.0.0

## EmptyStream (interface)

Represents the an empty `Doc`.

**Signature**

```ts
export interface EmptyStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'EmptyStream'
}
```

Added in v1.0.0

## FailedStream (interface)

Represents a `Doc` that failed to be laid out.

**Signature**

```ts
export interface FailedStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'FailedStream'
}
```

Added in v1.0.0

## LineStream (interface)

Represents a `Doc` containing a single line. The `indentation`
represents the indentation level for the subsequent line in the
`Doc`.

**Signature**

```ts
export interface LineStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'LineStream'
  readonly indentation: number
  readonly stream: DocStream<A>
}
```

Added in v1.0.0

## PopAnnotationStream (interface)

Represents the removal of a previously pushed annotation from a `Doc`.

**Signature**

```ts
export interface PopAnnotationStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'PopAnnotationStream'
  readonly stream: DocStream<A>
}
```

Added in v1.0.0

## PushAnnotationStream (interface)

Represents the addition of an annotation of type `A` to a `Doc`.

**Signature**

```ts
export interface PushAnnotationStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'PushAnnotationStream'
  readonly annotation: A
  readonly stream: DocStream<A>
}
```

Added in v1.0.0

## TextStream (interface)

Represents a `Doc` containing a string of text.

**Signature**

```ts
export interface TextStream<A> extends DocStream.Variance<A> {
  readonly _tag: 'TextStream'
  readonly text: string
  readonly stream: DocStream<A>
}
```

Added in v1.0.0

# refinements

## isCharStream

Returns `true` if the specified `DocStream` is a `CharStream`, `false` otherwise.

**Signature**

```ts
export declare const isCharStream: <A>(self: DocStream<A>) => self is CharStream<A>
```

Added in v1.0.0

## isDocStream

Returns `true` if the specified value is a `DocStream`, `false` otherwise.

**Signature**

```ts
export declare const isDocStream: (u: unknown) => u is DocStream<unknown>
```

Added in v1.0.0

## isEmptyStream

Returns `true` if the specified `DocStream` is a `EmptyStream`, `false` otherwise.

**Signature**

```ts
export declare const isEmptyStream: <A>(self: DocStream<A>) => self is EmptyStream<A>
```

Added in v1.0.0

## isFailedStream

Returns `true` if the specified `DocStream` is a `FailedStream`, `false` otherwise.

**Signature**

```ts
export declare const isFailedStream: <A>(self: DocStream<A>) => self is FailedStream<A>
```

Added in v1.0.0

## isLineStream

Returns `true` if the specified `DocStream` is a `LineStream`, `false` otherwise.

**Signature**

```ts
export declare const isLineStream: <A>(self: DocStream<A>) => self is LineStream<A>
```

Added in v1.0.0

## isPopAnnotationStream

Returns `true` if the specified `DocStream` is a `PopAnnotationStream`, `false` otherwise.

**Signature**

```ts
export declare const isPopAnnotationStream: <A>(self: DocStream<A>) => self is PopAnnotationStream<A>
```

Added in v1.0.0

## isPushAnnotationStream

Returns `true` if the specified `DocStream` is a `PushAnnotationStream`, `false` otherwise.

**Signature**

```ts
export declare const isPushAnnotationStream: <A>(self: DocStream<A>) => self is PushAnnotationStream<A>
```

Added in v1.0.0

## isTextStream

Returns `true` if the specified `DocStream` is a `TextStream`, `false` otherwise.

**Signature**

```ts
export declare const isTextStream: <A>(self: DocStream<A>) => self is TextStream<A>
```

Added in v1.0.0

# symbol

## DocStreamTypeId

**Signature**

```ts
export declare const DocStreamTypeId: typeof DocStreamTypeId
```

Added in v1.0.0

## DocStreamTypeId (type alias)

**Signature**

```ts
export type DocStreamTypeId = typeof DocStreamTypeId
```

Added in v1.0.0

# utils

## DocStream (namespace)

Added in v1.0.0

### Variance (interface)

**Signature**

```ts
export interface Variance<A> extends Equal {
  readonly [DocStreamTypeId]: {
    readonly _A: (_: never) => A
  }
}
```

Added in v1.0.0

### TypeLambda (type alias)

**Signature**

```ts
export type TypeLambda = DocStreamTypeLambda
```

Added in v1.0.0
