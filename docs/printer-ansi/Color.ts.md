---
title: Color.ts
nav_order: 3
parent: "@effect/printer-ansi"
---

## Color overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [black](#black)
  - [blue](#blue)
  - [cyan](#cyan)
  - [green](#green)
  - [magenta](#magenta)
  - [red](#red)
  - [white](#white)
  - [yellow](#yellow)
- [destructors](#destructors)
  - [toCode](#tocode)
- [model](#model)
  - [Black (interface)](#black-interface)
  - [Blue (interface)](#blue-interface)
  - [Color (type alias)](#color-type-alias)
  - [Cyan (interface)](#cyan-interface)
  - [Green (interface)](#green-interface)
  - [Magenta (interface)](#magenta-interface)
  - [Red (interface)](#red-interface)
  - [White (interface)](#white-interface)
  - [Yellow (interface)](#yellow-interface)

---

# constructors

## black

**Signature**

```ts
export declare const black: Color
```

Added in v1.0.0

## blue

**Signature**

```ts
export declare const blue: Color
```

Added in v1.0.0

## cyan

**Signature**

```ts
export declare const cyan: Color
```

Added in v1.0.0

## green

**Signature**

```ts
export declare const green: Color
```

Added in v1.0.0

## magenta

**Signature**

```ts
export declare const magenta: Color
```

Added in v1.0.0

## red

**Signature**

```ts
export declare const red: Color
```

Added in v1.0.0

## white

**Signature**

```ts
export declare const white: Color
```

Added in v1.0.0

## yellow

**Signature**

```ts
export declare const yellow: Color
```

Added in v1.0.0

# destructors

## toCode

**Signature**

```ts
export declare const toCode: (color: Color) => number
```

Added in v1.0.0

# model

## Black (interface)

**Signature**

```ts
export interface Black {
  readonly _tag: "Black"
}
```

Added in v1.0.0

## Blue (interface)

**Signature**

```ts
export interface Blue {
  readonly _tag: "Blue"
}
```

Added in v1.0.0

## Color (type alias)

**Signature**

```ts
export type Color = Black | Red | Green | Yellow | Blue | Magenta | Cyan | White
```

Added in v1.0.0

## Cyan (interface)

**Signature**

```ts
export interface Cyan {
  readonly _tag: "Cyan"
}
```

Added in v1.0.0

## Green (interface)

**Signature**

```ts
export interface Green {
  readonly _tag: "Green"
}
```

Added in v1.0.0

## Magenta (interface)

**Signature**

```ts
export interface Magenta {
  readonly _tag: "Magenta"
}
```

Added in v1.0.0

## Red (interface)

**Signature**

```ts
export interface Red {
  readonly _tag: "Red"
}
```

Added in v1.0.0

## White (interface)

**Signature**

```ts
export interface White {
  readonly _tag: "White"
}
```

Added in v1.0.0

## Yellow (interface)

**Signature**

```ts
export interface Yellow {
  readonly _tag: "Yellow"
}
```

Added in v1.0.0
