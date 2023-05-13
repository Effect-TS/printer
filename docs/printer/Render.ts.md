---
title: Render.ts
nav_order: 9
parent: "@effect/printer"
---

## Render overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [rendering](#rendering)
  - [compact](#compact)
  - [pretty](#pretty)
  - [prettyDefault](#prettydefault)
  - [prettyUnbounded](#prettyunbounded)
  - [render](#render)
  - [smart](#smart)
  - [smartDefault](#smartdefault)
  - [smartUnbounded](#smartunbounded)

---

# rendering

## compact

**Signature**

```ts
export declare const compact: <A>(self: Doc<A>) => string
```

Added in v1.0.0

## pretty

**Signature**

```ts
export declare const pretty: {
  (options: Partial<Omit<AvailablePerLine, '_tag'>>): <A>(self: Doc<A>) => string
  <A>(self: Doc<A>, options: Partial<Omit<AvailablePerLine, '_tag'>>): string
}
```

Added in v1.0.0

## prettyDefault

**Signature**

```ts
export declare const prettyDefault: <A>(self: Doc<A>) => string
```

Added in v1.0.0

## prettyUnbounded

**Signature**

```ts
export declare const prettyUnbounded: <A>(self: Doc<A>) => string
```

Added in v1.0.0

## render

Renders a `DocStream` to a `string`.

**Note**: this method requires using a `Layout` algorithm to layout a `Doc`
into a `DocStream` prior to rendering.

**Signature**

```ts
export declare const render: <A>(self: DocStream<A>) => string
```

Added in v1.0.0

## smart

**Signature**

```ts
export declare const smart: {
  (options: Partial<Omit<AvailablePerLine, '_tag'>>): <A>(self: Doc<A>) => string
  <A>(self: Doc<A>, options: Partial<Omit<AvailablePerLine, '_tag'>>): string
}
```

Added in v1.0.0

## smartDefault

**Signature**

```ts
export declare const smartDefault: <A>(self: Doc<A>) => string
```

Added in v1.0.0

## smartUnbounded

**Signature**

```ts
export declare const smartUnbounded: <A>(self: Doc<A>) => string
```

Added in v1.0.0
