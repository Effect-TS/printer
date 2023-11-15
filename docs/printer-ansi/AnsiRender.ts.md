---
title: AnsiRender.ts
nav_order: 2
parent: "@effect/printer-ansi"
---

## AnsiRender overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [rendering algorithms](#rendering-algorithms)
  - [compact](#compact)
  - [pretty](#pretty)
  - [prettyDefault](#prettydefault)
  - [prettyUnbounded](#prettyunbounded)
  - [render](#render)
  - [smart](#smart)
  - [smartDefault](#smartdefault)
  - [smartUnbounded](#smartunbounded)

---

# rendering algorithms

## compact

**Signature**

```ts
export declare const compact: (self: AnsiDoc) => string
```

Added in v1.0.0

## pretty

**Signature**

```ts
export declare const pretty: {
  (options: Partial<Omit<AvailablePerLine, "_tag">>): (self: Doc<AnsiStyle>) => string
  (self: Doc<AnsiStyle>, options: Partial<Omit<AvailablePerLine, "_tag">>): string
}
```

Added in v1.0.0

## prettyDefault

**Signature**

```ts
export declare const prettyDefault: (self: AnsiDoc) => string
```

Added in v1.0.0

## prettyUnbounded

**Signature**

```ts
export declare const prettyUnbounded: (self: AnsiDoc) => string
```

Added in v1.0.0

## render

**Signature**

```ts
export declare const render: (self: DocStream<AnsiStyle>) => string
```

Added in v1.0.0

## smart

**Signature**

```ts
export declare const smart: {
  (options: Partial<Omit<AvailablePerLine, "_tag">>): (self: Doc<AnsiStyle>) => string
  (self: Doc<AnsiStyle>, options: Partial<Omit<AvailablePerLine, "_tag">>): string
}
```

Added in v1.0.0

## smartDefault

**Signature**

```ts
export declare const smartDefault: (self: AnsiDoc) => string
```

Added in v1.0.0

## smartUnbounded

**Signature**

```ts
export declare const smartUnbounded: (self: Doc<AnsiStyle>) => string
```

Added in v1.0.0
