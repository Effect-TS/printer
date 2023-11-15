---
title: index.ts
nav_order: 5
parent: "@effect/printer"
---

## index overview

The abstract data type `Doc<A>` represents prettified documents that have
been annotated with data of type `A`.

More specifically, a value of type `Doc` represents a non-empty set of
possible layouts for a given document. The layout algorithms select one of
these possibilities, taking into account variables such as the width of the
document.

The annotation is an arbitrary piece of data associated with (part of) a
document. Annotations may be used by rendering algorithms to display
documents differently by providing information such as:

- color information (e.g., when rendering to the terminal)
- mouseover text (e.g., when rendering to rich HTML)
- whether to show something or not (to allow simple or detailed versions)

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [exports](#exports)
  - [From "./Doc.js"](#from-docjs)
  - [From "./DocStream.js"](#from-docstreamjs)
  - [From "./DocTree.js"](#from-doctreejs)
  - [From "./Flatten.js"](#from-flattenjs)
  - [From "./Layout.js"](#from-layoutjs)
  - [From "./Optimize.js"](#from-optimizejs)
  - [From "./PageWidth.js"](#from-pagewidthjs)
  - [From "./Render.js"](#from-renderjs)

---

# exports

## From "./Doc.js"

The abstract data type `Doc<A>` represents prettified documents that have
been annotated with data of type `A`.

More specifically, a value of type `Doc` represents a non-empty set of
possible layouts for a given document. The layout algorithms select one of
these possibilities, taking into account variables such as the width of the
document.

The annotation is an arbitrary piece of data associated with (part of) a
document. Annotations may be used by rendering algorithms to display
documents differently by providing information such as:

- color information (e.g., when rendering to the terminal)
- mouseover text (e.g., when rendering to rich HTML)
- whether to show something or not (to allow simple or detailed versions)

**Signature**

```ts
export * as Doc from "./Doc.js"
```

Added in v1.0.0

## From "./DocStream.js"

Re-exports all named exports from the "./DocStream.js" module as `DocStream`.

**Signature**

```ts
export * as DocStream from "./DocStream.js"
```

Added in v1.0.0

## From "./DocTree.js"

Re-exports all named exports from the "./DocTree.js" module as `DocTree`.

**Signature**

```ts
export * as DocTree from "./DocTree.js"
```

Added in v1.0.0

## From "./Flatten.js"

Re-exports all named exports from the "./Flatten.js" module as `Flatten`.

**Signature**

```ts
export * as Flatten from "./Flatten.js"
```

Added in v1.0.0

## From "./Layout.js"

Re-exports all named exports from the "./Layout.js" module as `Layout`.

**Signature**

```ts
export * as Layout from "./Layout.js"
```

Added in v1.0.0

## From "./Optimize.js"

Re-exports all named exports from the "./Optimize.js" module as `Optimize`.

**Signature**

```ts
export * as Optimize from "./Optimize.js"
```

Added in v1.0.0

## From "./PageWidth.js"

Re-exports all named exports from the "./PageWidth.js" module as `PageWidth`.

**Signature**

```ts
export * as PageWidth from "./PageWidth.js"
```

Added in v1.0.0

## From "./Render.js"

Re-exports all named exports from the "./Render.js" module as `Render`.

**Signature**

```ts
export * as Render from "./Render.js"
```

Added in v1.0.0
