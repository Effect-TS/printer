---
title: Flatten.ts
nav_order: 4
parent: "@effect/printer"
---

## Flatten overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [alreadyFlat](#alreadyflat)
  - [flattened](#flattened)
  - [neverFlat](#neverflat)
- [mapping](#mapping)
  - [map](#map)
- [model](#model)
  - [AlreadyFlat (interface)](#alreadyflat-interface)
  - [Flatten (type alias)](#flatten-type-alias)
  - [FlattenTypeLambda (interface)](#flattentypelambda-interface)
  - [Flattened (interface)](#flattened-interface)
  - [NeverFlat (interface)](#neverflat-interface)
- [refinements](#refinements)
  - [isAlreadyFlat](#isalreadyflat)
  - [isFlatten](#isflatten)
  - [isFlattened](#isflattened)
  - [isNeverFlat](#isneverflat)
- [symbol](#symbol)
  - [FlattenTypeId](#flattentypeid)
  - [FlattenTypeId (type alias)](#flattentypeid-type-alias)
- [utils](#utils)
  - [Flatten (namespace)](#flatten-namespace)
    - [Variance (interface)](#variance-interface)
    - [TypeLambda (type alias)](#typelambda-type-alias)

---

# constructors

## alreadyFlat

**Signature**

```ts
export declare const alreadyFlat: Flatten<never>
```

Added in v1.0.0

## flattened

**Signature**

```ts
export declare const flattened: <A>(value: A) => Flatten<A>
```

Added in v1.0.0

## neverFlat

**Signature**

```ts
export declare const neverFlat: Flatten<never>
```

Added in v1.0.0

# mapping

## map

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): (self: Flatten<A>) => Flatten<B>
  <A, B>(self: Flatten<A>, f: (a: A) => B): Flatten<B>
}
```

Added in v1.0.0

# model

## AlreadyFlat (interface)

Represents a `FlattenResult` where the input was already flat.

**Signature**

```ts
export interface AlreadyFlat<A> extends Flatten.Variance<A> {
  readonly _tag: "AlreadyFlat"
}
```

Added in v1.0.0

## Flatten (type alias)

Because certain documents do not change after removal of newlines, etc, there
is no point in creating a `Union` of the flattened and unflattened versions.
All this leads to is the introduction of two possible branches for a layout
algorithm to take, resulting in potentially exponential behavior on deeply
nested examples.

**Signature**

```ts
export type Flatten<A> = Flattened<A> | AlreadyFlat<A> | NeverFlat<A>
```

Added in v1.0.0

## FlattenTypeLambda (interface)

**Signature**

```ts
export interface FlattenTypeLambda extends TypeLambda {
  readonly type: Flatten<this["Target"]>
}
```

Added in v1.0.0

## Flattened (interface)

Represents a `FlattenResult` where `A` is likely flatter than the input.

**Signature**

```ts
export interface Flattened<A> extends Flatten.Variance<A> {
  readonly _tag: "Flattened"
  readonly value: A
}
```

Added in v1.0.0

## NeverFlat (interface)

Represents a `FlattenResult` where the input cannot be flattened.

**Signature**

```ts
export interface NeverFlat<A> extends Flatten.Variance<A> {
  readonly _tag: "NeverFlat"
}
```

Added in v1.0.0

# refinements

## isAlreadyFlat

Returns `true` if the specified `Flatten` is an `AlreadyFlat`, `false` otherwise.

**Signature**

```ts
export declare const isAlreadyFlat: <A>(a: Flatten<A>) => a is AlreadyFlat<A>
```

Added in v1.0.0

## isFlatten

Returns `true` if the specified value is a `Flatten`, `false` otherwise.

**Signature**

```ts
export declare const isFlatten: (u: unknown) => u is Flatten<unknown>
```

Added in v1.0.0

## isFlattened

Returns `true` if the specified `Flatten` is a `Flattened`, `false` otherwise.

**Signature**

```ts
export declare const isFlattened: <A>(a: Flatten<A>) => a is Flattened<A>
```

Added in v1.0.0

## isNeverFlat

Returns `true` if the specified `Flatten` is a `NeverFlat`, `false` otherwise.

**Signature**

```ts
export declare const isNeverFlat: <A>(a: Flatten<A>) => a is NeverFlat<A>
```

Added in v1.0.0

# symbol

## FlattenTypeId

**Signature**

```ts
export declare const FlattenTypeId: typeof FlattenTypeId
```

Added in v1.0.0

## FlattenTypeId (type alias)

**Signature**

```ts
export type FlattenTypeId = typeof FlattenTypeId
```

Added in v1.0.0

# utils

## Flatten (namespace)

Added in v1.0.0

### Variance (interface)

**Signature**

```ts
export interface Variance<A> extends Equal {
  readonly [FlattenTypeId]: {
    readonly _A: (_: never) => A
  }
}
```

Added in v1.0.0

### TypeLambda (type alias)

**Signature**

```ts
export type TypeLambda = FlattenTypeLambda
```

Added in v1.0.0
