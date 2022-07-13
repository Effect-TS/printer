import { constant } from "@effect-ts/core/Function"
import * as fc from "fast-check"

export const arbEmpty: fc.Arbitrary<Doc<number>> = fc.constant(Doc.empty)

export const arbChar: fc.Arbitrary<Doc<number>> = fc.char().map(Doc.char)

export const arbText: fc.Arbitrary<Doc<number>> = fc.string().map(Doc.text)

export const arbLine: fc.Arbitrary<Doc<number>> = fc.constant(Doc.hardLine)

export const arbFlatAlt: fc.Arbitrary<Doc<number>> = fc
  .tuple(fc.oneof(arbChar, arbText), fc.oneof(arbChar, arbText))
  .map(([d1, d2]) => Doc.flatAlt(d1, d2))

export const arbCat: fc.Arbitrary<Doc<number>> = fc
  .tuple(fc.oneof(arbChar, arbText), fc.oneof(arbChar, arbText))
  .map(([d1, d2]) => Doc.cat(d1, d2))

export const arbNest: fc.Arbitrary<Doc<number>> = fc
  .tuple(fc.oneof(arbChar, arbText), fc.integer())
  .map(([d, i]) => Doc.nest(d, i))

export const arbUnion: fc.Arbitrary<Doc<number>> = fc
  .tuple(fc.oneof(arbChar, arbText), fc.oneof(arbChar, arbText))
  .map(([d1, d2]) => Doc.union(d1, d2))

export const arbColumn: fc.Arbitrary<Doc<number>> = fc
  .oneof(arbChar, arbText)
  .map((d) => Doc.column(constant(d)))

export const arbWithPageWidth: fc.Arbitrary<Doc<number>> = fc
  .oneof(arbChar, arbText)
  .map((d) => Doc.withPageWidth(constant(d)))

export const arbNesting: fc.Arbitrary<Doc<number>> = fc
  .oneof(arbChar, arbText)
  .map((d) => Doc.nesting(constant(d)))

export const arbAnnotated: fc.Arbitrary<Doc<number>> = fc
  .tuple(fc.oneof(arbChar, arbText), fc.integer())
  .map(([d, n]) => d.annotate(n))

export const arbDoc: fc.Arbitrary<Doc<number>> = fc.oneof(
  arbEmpty,
  arbChar,
  arbText,
  arbLine,
  arbFlatAlt,
  arbCat,
  arbNest,
  arbUnion,
  arbColumn,
  arbWithPageWidth,
  arbNesting,
  arbAnnotated
)