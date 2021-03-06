// tracing: off

import * as IO from "@effect-ts/core/IO"

import type { Doc } from "../Doc"
import * as D from "../Doc"

// -------------------------------------------------------------------------------------
// definition
// -------------------------------------------------------------------------------------

/**
 * Represents optimization of a given document tree through fusion of redundant
 * document nodes.
 */
export type Optimize<A> = (depth: FusionDepth) => Doc<A>

/**
 * Represents an instruction that determines how deeply the document fusion optimizer
 * should traverse the document tree.
 */
export type FusionDepth = Shallow | Deep

/**
 * Instructs the document fusion optimizer to avoid diving deeply into nested
 * documents, fusing mostly concatenations of text nodes together.
 */
export type Shallow = "Shallow"

/**
 * Instructs the document fusion optimizer to recurse into all leaves of the document
 * tree, including different layout alternatives and all location-sensitive values
 * (i.e. those created by `nesting`), which cannot be fused before, but only during,
 * the layout process. As a result, the performance cost of using deep document fusion
 * optimization is often hard to predict and depends on the interplay between page
 * layout and the document that is to be pretty printed.
 *
 * This value should only be utilized if profiling demonstrates that it is
 * **significantly** faster than using `Shallow`.
 */
export type Deep = "Deep"

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const Shallow: FusionDepth = "Shallow"

export const Deep: FusionDepth = "Deep"

// -------------------------------------------------------------------------------------
// operations
// -------------------------------------------------------------------------------------

function optimizeRec<A>(x: Doc<A>, depth: FusionDepth): IO.IO<Doc<A>> {
  return IO.gen(function* (_) {
    switch (x._tag) {
      case "FlatAlt": {
        return D.flatAlt_(
          yield* _(optimizeRec(x.left, depth)),
          yield* _(optimizeRec(x.right, depth))
        )
      }
      case "Cat": {
        // Empty documents
        if (D.isEmpty(x.left)) {
          return yield* _(optimizeRec(x.right, depth))
        }
        if (D.isEmpty(x.right)) {
          return yield* _(optimizeRec(x.left, depth))
        }

        // String documents
        if (D.isChar(x.left) && D.isChar(x.right)) {
          return D.text(x.left.char + x.right.char)
        }
        if (D.isText(x.left) && D.isChar(x.right)) {
          return D.text(x.left.text + x.right.char)
        }
        if (D.isChar(x.left) && D.isText(x.right)) {
          return D.text(x.left.char + x.right.text)
        }
        if (D.isText(x.left) && D.isText(x.right)) {
          return D.text(x.left.text + x.right.text)
        }
        // Nested strings
        if (D.isChar(x.left) && D.isCat(x.right) && D.isChar(x.right.left)) {
          const inner = yield* _(optimizeRec(D.cat_(x.left, x.right.left), depth))
          return yield* _(optimizeRec(D.cat_(inner, x.right.right), depth))
        }
        if (D.isText(x.left) && D.isCat(x.right) && D.isChar(x.right.left)) {
          const inner = yield* _(optimizeRec(D.cat_(x.left, x.right.left), depth))
          return yield* _(optimizeRec(D.cat_(inner, x.right.right), depth))
        }
        if (D.isChar(x.left) && D.isCat(x.right) && D.isText(x.right.left)) {
          const inner = yield* _(optimizeRec(D.cat_(x.left, x.right.left), depth))
          return yield* _(optimizeRec(D.cat_(inner, x.right.right), depth))
        }
        if (D.isText(x.left) && D.isCat(x.right) && D.isText(x.right.left)) {
          const inner = yield* _(optimizeRec(D.cat_(x.left, x.right.left), depth))
          return yield* _(optimizeRec(D.cat_(inner, x.right.right), depth))
        }
        if (D.isCat(x.left) && D.isChar(x.right)) {
          const inner = yield* _(optimizeRec(D.cat_(x.left.right, x.right), depth))
          return yield* _(optimizeRec(D.cat_(x.left.left, inner), depth))
        }
        if (D.isCat(x.left) && D.isText(x.left.right)) {
          const inner = yield* _(optimizeRec(D.cat_(x.left.right, x.right), depth))
          return yield* _(optimizeRec(D.cat_(x.left.left, inner), depth))
        }
        const inner = D.cat_(
          yield* _(optimizeRec(x.left, depth)),
          yield* _(optimizeRec(x.right, depth))
        )
        return yield* _(optimizeRec(inner, depth))
      }
      case "Nest": {
        if (D.isEmpty(x.doc)) return x.doc
        if (D.isChar(x.doc)) return x.doc
        if (D.isText(x.doc)) return x.doc
        if (D.isNest(x.doc)) {
          return yield* _(optimizeRec(D.nest_(x.doc, x.indent + x.doc.indent), depth))
        }
        if (x.indent === 0) return yield* _(optimizeRec(x.doc, depth))
        return D.nest_(yield* _(optimizeRec(x.doc, depth)), x.indent)
      }
      case "Union": {
        return D.union_(
          yield* _(optimizeRec(x.left, depth)),
          yield* _(optimizeRec(x.right, depth))
        )
      }
      case "Column": {
        return depth === Shallow
          ? D.column(x.react)
          : D.column((position) => IO.run(optimizeRec(x.react(position), depth)))
      }
      case "WithPageWidth": {
        return depth === Shallow
          ? D.withPageWidth(x.react)
          : D.withPageWidth((pageWidth) =>
              IO.run(optimizeRec(x.react(pageWidth), depth))
            )
      }
      case "Nesting": {
        return depth === Shallow
          ? D.nesting(x.react)
          : D.nesting((level) => IO.run(optimizeRec(x.react(level), depth)))
      }
      case "Annotated": {
        return D.annotate_(yield* _(optimizeRec(x.doc, depth)), x.annotation)
      }
      default:
        return x
    }
  })
}

export function optimize_<A>(depth: FusionDepth, doc: Doc<A>): Doc<A> {
  return IO.run(optimizeRec(doc, depth))
}

/**
 * The `optimizer` will combine text nodes so that they can be rendered more
 * efficiently. An optimized document is always laid out in an identical manner to its
 * un-optimized counterpart.
 *
 * When laying a `Doc` out to a `SimpleDocStream`, every component of the input
 * document is translated directly to the simpler output format. This sometimes
 * yields undesirable chunking when many pieces have been concatenated together.
 *
 * It is therefore a good idea to run `fuse` on concatenations of lots of small
 * strings that are used many times.
 *
 * ```typescript
 * import * as D from "../src/Core/Doc"
 *
 * // The document below contains a chain of four entries in the output `DocStream`
 * const doc1 = D.hsepT(D.char("a"), D.char("b"), D.char("c"), D.char("d"))
 *
 * // but is fully equivalent to the tightly packed document below which is only
 * // a single entry in the output `DocStream` and can be processed much more
 * // efficiently.
 * const doc2 = D.text("abcd")
 * ```
 */
export function optimize<A>(doc: Doc<A>): Optimize<A> {
  return (depth) => optimize_(depth, doc)
}
