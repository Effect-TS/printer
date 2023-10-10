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
  - [From "@effect/printer/Doc"](#from-effectprinterdoc)
  - [From "@effect/printer/DocStream"](#from-effectprinterdocstream)
  - [From "@effect/printer/DocTree"](#from-effectprinterdoctree)
  - [From "@effect/printer/Flatten"](#from-effectprinterflatten)
  - [From "@effect/printer/Layout"](#from-effectprinterlayout)
  - [From "@effect/printer/Optimize"](#from-effectprinteroptimize)
  - [From "@effect/printer/PageWidth"](#from-effectprinterpagewidth)
  - [From "@effect/printer/Render"](#from-effectprinterrender)

---

# exports

## From "@effect/printer/Doc"

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
export * as Doc from '@effect/printer/Doc'
```

Added in v1.0.0

## From "@effect/printer/DocStream"

Re-exports all named exports from the "@effect/printer/DocStream" module as `DocStream`.

**Signature**

```ts
export * as DocStream from '@effect/printer/DocStream'
```

Added in v1.0.0

## From "@effect/printer/DocTree"

Re-exports all named exports from the "@effect/printer/DocTree" module as `DocTree`.

**Signature**

```ts
export * as DocTree from '@effect/printer/DocTree'
```

Added in v1.0.0

## From "@effect/printer/Flatten"

Re-exports all named exports from the "@effect/printer/Flatten" module as `Flatten`.

**Signature**

```ts
export * as Flatten from '@effect/printer/Flatten'
```

Added in v1.0.0

## From "@effect/printer/Layout"

Re-exports all named exports from the "@effect/printer/Layout" module as `Layout`.

**Signature**

```ts
export * as Layout from '@effect/printer/Layout'
```

Added in v1.0.0

## From "@effect/printer/Optimize"

Re-exports all named exports from the "@effect/printer/Optimize" module as `Optimize`.

**Signature**

```ts
export * as Optimize from '@effect/printer/Optimize'
```

Added in v1.0.0

## From "@effect/printer/PageWidth"

Re-exports all named exports from the "@effect/printer/PageWidth" module as `PageWidth`.

**Signature**

```ts
export * as PageWidth from '@effect/printer/PageWidth'
```

Added in v1.0.0

## From "@effect/printer/Render"

Re-exports all named exports from the "@effect/printer/Render" module as `Render`.

**Signature**

```ts
export * as Render from '@effect/printer/Render'
```

Added in v1.0.0
