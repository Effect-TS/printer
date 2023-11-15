---
title: RenderLayer.ts
nav_order: 6
parent: "@effect/printer-ansi"
---

## RenderLayer overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [background](#background)
  - [foreground](#foreground)
- [model](#model)
  - [Background (interface)](#background-interface)
  - [Foreground (interface)](#foreground-interface)
  - [RenderLayer (type alias)](#renderlayer-type-alias)

---

# constructors

## background

**Signature**

```ts
export declare const background: RenderLayer
```

Added in v1.0.0

## foreground

**Signature**

```ts
export declare const foreground: RenderLayer
```

Added in v1.0.0

# model

## Background (interface)

**Signature**

```ts
export interface Background {
  readonly _tag: "Background"
}
```

Added in v1.0.0

## Foreground (interface)

**Signature**

```ts
export interface Foreground {
  readonly _tag: "Foreground"
}
```

Added in v1.0.0

## RenderLayer (type alias)

**Signature**

```ts
export type RenderLayer = Background | Foreground
```

Added in v1.0.0
