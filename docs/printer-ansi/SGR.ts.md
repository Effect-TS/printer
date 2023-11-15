---
title: SGR.ts
nav_order: 7
parent: "@effect/printer-ansi"
---

## SGR overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [reset](#reset)
  - [setBold](#setbold)
  - [setColor](#setcolor)
  - [setItalicized](#setitalicized)
  - [setUnderlined](#setunderlined)
- [destructors](#destructors)
  - [toCode](#tocode)
  - [toEscapeSequence](#toescapesequence)
- [model](#model)
  - [Reset (interface)](#reset-interface)
  - [SGR (type alias)](#sgr-type-alias)
  - [SetBold (interface)](#setbold-interface)
  - [SetColor (interface)](#setcolor-interface)
  - [SetItalicized (interface)](#setitalicized-interface)
  - [SetUnderlined (interface)](#setunderlined-interface)

---

# constructors

## reset

**Signature**

```ts
export declare const reset: SGR
```

Added in v1.0.0

## setBold

**Signature**

```ts
export declare const setBold: (bold: boolean) => SGR
```

Added in v1.0.0

## setColor

**Signature**

```ts
export declare const setColor: (color: Color, vivid: boolean, layer: RenderLayer) => SGR
```

Added in v1.0.0

## setItalicized

**Signature**

```ts
export declare const setItalicized: (italicized: boolean) => SGR
```

Added in v1.0.0

## setUnderlined

**Signature**

```ts
export declare const setUnderlined: (underlined: boolean) => SGR
```

Added in v1.0.0

# destructors

## toCode

**Signature**

```ts
export declare const toCode: (self: SGR) => number
```

Added in v1.0.0

## toEscapeSequence

**Signature**

```ts
export declare const toEscapeSequence: (sgrs: Iterable<SGR>) => string
```

Added in v1.0.0

# model

## Reset (interface)

**Signature**

```ts
export interface Reset {
  readonly _tag: "Reset"
}
```

Added in v1.0.0

## SGR (type alias)

**Signature**

```ts
export type SGR = Reset | SetBold | SetItalicized | SetUnderlined | SetColor
```

Added in v1.0.0

## SetBold (interface)

**Signature**

```ts
export interface SetBold {
  readonly _tag: "SetBold"
  readonly bold: boolean
}
```

Added in v1.0.0

## SetColor (interface)

**Signature**

```ts
export interface SetColor {
  readonly _tag: "SetColor"
  readonly color: Color
  readonly vivid: boolean
  readonly layer: RenderLayer
}
```

Added in v1.0.0

## SetItalicized (interface)

**Signature**

```ts
export interface SetItalicized {
  readonly _tag: "SetItalicized"
  readonly italicized: boolean
}
```

Added in v1.0.0

## SetUnderlined (interface)

**Signature**

```ts
export interface SetUnderlined {
  readonly _tag: "SetUnderlined"
  readonly underlined: boolean
}
```

Added in v1.0.0
