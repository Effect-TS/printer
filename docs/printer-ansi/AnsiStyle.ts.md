---
title: AnsiStyle.ts
nav_order: 3
parent: "@effect/printer-ansi"
---

## AnsiStyle overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [backgroundColor](#backgroundcolor)
  - [bold](#bold)
  - [color](#color)
  - [dullBackgroundColor](#dullbackgroundcolor)
  - [dullColor](#dullcolor)
  - [italicized](#italicized)
  - [underlined](#underlined)
- [destructors](#destructors)
  - [stringify](#stringify)
- [instances](#instances)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
- [model](#model)
  - [AnsiStyle (interface)](#ansistyle-interface)
- [utils](#utils)
  - [combine](#combine)

---

# constructors

## backgroundColor

**Signature**

```ts
export declare const backgroundColor: (color: Color) => AnsiStyle
```

Added in v1.0.0

## bold

**Signature**

```ts
export declare const bold: AnsiStyle
```

Added in v1.0.0

## color

**Signature**

```ts
export declare const color: (color: Color) => AnsiStyle
```

Added in v1.0.0

## dullBackgroundColor

**Signature**

```ts
export declare const dullBackgroundColor: (color: Color) => AnsiStyle
```

Added in v1.0.0

## dullColor

**Signature**

```ts
export declare const dullColor: (color: Color) => AnsiStyle
```

Added in v1.0.0

## italicized

**Signature**

```ts
export declare const italicized: AnsiStyle
```

Added in v1.0.0

## underlined

**Signature**

```ts
export declare const underlined: AnsiStyle
```

Added in v1.0.0

# destructors

## stringify

**Signature**

```ts
export declare const stringify: (self: AnsiStyle) => string
```

Added in v1.0.0

# instances

## Monoid

**Signature**

```ts
export declare const Monoid: monoid.Monoid<AnsiStyle>
```

Added in v1.0.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: semigroup.Semigroup<AnsiStyle>
```

Added in v1.0.0

# model

## AnsiStyle (interface)

**Signature**

```ts
export interface AnsiStyle {
  readonly foreground: Option<SGR>
  readonly background: Option<SGR>
  readonly bold: Option<SGR>
  readonly italicized: Option<SGR>
  readonly underlined: Option<SGR>
}
```

Added in v1.0.0

# utils

## combine

**Signature**

```ts
export declare const combine: (self: AnsiStyle, that: AnsiStyle) => AnsiStyle
```

Added in v1.0.0
