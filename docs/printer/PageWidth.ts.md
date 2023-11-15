---
title: PageWidth.ts
nav_order: 8
parent: "@effect/printer"
---

## PageWidth overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [availablePerLine](#availableperline)
  - [defaultPageWidth](#defaultpagewidth)
  - [unbounded](#unbounded)
- [model](#model)
  - [AvailablePerLine (interface)](#availableperline-interface)
  - [PageWidth (type alias)](#pagewidth-type-alias)
  - [Unbounded (interface)](#unbounded-interface)
- [refinements](#refinements)
  - [isAvailablePerLine](#isavailableperline)
  - [isPageWidth](#ispagewidth)
  - [isUnbounded](#isunbounded)
- [symbol](#symbol)
  - [PageWidthTypeId](#pagewidthtypeid)
  - [PageWidthTypeId (type alias)](#pagewidthtypeid-type-alias)
- [utilities](#utilities)
  - [remainingWidth](#remainingwidth)
- [utils](#utils)
  - [PageWidth (namespace)](#pagewidth-namespace)
    - [Proto (interface)](#proto-interface)

---

# constructors

## availablePerLine

**Signature**

```ts
export declare const availablePerLine: (lineWidth: number, ribbonFraction: number) => PageWidth
```

Added in v1.0.0

## defaultPageWidth

**Signature**

```ts
export declare const defaultPageWidth: PageWidth
```

Added in v1.0.0

## unbounded

**Signature**

```ts
export declare const unbounded: PageWidth
```

Added in v1.0.0

# model

## AvailablePerLine (interface)

Represents a `PageWidth` setting that informs the layout algorithms to avoid
exceeding the specified space per line.

**Signature**

```ts
export interface AvailablePerLine extends PageWidth.Proto {
  readonly _tag: "AvailablePerLine"
  /**
   * The number of characters, including whitespace, that can fit on a single
   * line.
   */
  readonly lineWidth: number
  /**
   * The fraction of the total page width that can be printed on. This allows
   * limiting the length of printable text per line. Values must be between
   * `0` and `1` (`0.4` to `1` is typical).
   */
  readonly ribbonFraction: number
}
```

Added in v1.0.0

## PageWidth (type alias)

Represents the maximum number of characters that fit onto a single line in a
document. The layout algorithms will try to avoid exceeding the set character
limit by inserting line breaks where appropriate (e.g., via `softLine`).

**Signature**

```ts
export type PageWidth = AvailablePerLine | Unbounded
```

Added in v1.0.0

## Unbounded (interface)

Represents a `PageWidth` setting that informs the layout algorithms to avoid
introducing line breaks into a document.

**Signature**

```ts
export interface Unbounded extends PageWidth.Proto {
  readonly _tag: "Unbounded"
}
```

Added in v1.0.0

# refinements

## isAvailablePerLine

Returns `true` if the specified `PageWidth` is an `AvailablePerLine`, `false`
otherwise.

**Signature**

```ts
export declare const isAvailablePerLine: (self: PageWidth) => self is AvailablePerLine
```

Added in v1.0.0

## isPageWidth

Returns `true` if the specified value is a `PageWidth`, `false` otherwise.

**Signature**

```ts
export declare const isPageWidth: (u: unknown) => u is PageWidth
```

Added in v1.0.0

## isUnbounded

Returns `true` if the specified `PageWidth` is an `Unbounded`, `false`
otherwise.

**Signature**

```ts
export declare const isUnbounded: (self: PageWidth) => self is Unbounded
```

Added in v1.0.0

# symbol

## PageWidthTypeId

**Signature**

```ts
export declare const PageWidthTypeId: typeof PageWidthTypeId
```

Added in v1.0.0

## PageWidthTypeId (type alias)

**Signature**

```ts
export type PageWidthTypeId = typeof PageWidthTypeId
```

Added in v1.0.0

# utilities

## remainingWidth

Calculates the remaining width on the current line.

**Signature**

```ts
export declare const remainingWidth: (
  lineLength: number,
  ribbonFraction: number,
  lineIndent: number,
  currentColumn: number
) => number
```

Added in v1.0.0

# utils

## PageWidth (namespace)

Added in v1.0.0

### Proto (interface)

**Signature**

```ts
export interface Proto extends Equal {
  readonly [PageWidthTypeId]: PageWidthTypeId
}
```

Added in v1.0.0
