export const PageWidthSym = Symbol.for("@effect/printer/PageWidth")
export type PageWidthSym = typeof PageWidthSym

/**
 * Represents the maximum number of characters that fit onto a single line in a
 * document. The layout algorithms will try to avoid exceeding the set character
 * limit by inserting line breaks where appropriate (e.g., via `softLine`).
 *
 * @tsplus type effect/printer/PageWidth
 */
export type PageWidth = AvailablePerLine | Unbounded

/**
 * Represents a `PageWidth` setting that informs the layout algorithms to avoid
 * exceeding the specified space per line.
 *
 * @tsplus type effect/printer/PageWidth/AvailablePerLine
 */
export class AvailablePerLine implements Equals {
  readonly [PageWidthSym]: PageWidthSym = PageWidthSym

  readonly _tag = "AvailablePerLine"

  constructor(
    /**
     * The number of characters, including whitespace, that can fit on a single
     * line.
     */
    readonly lineWidth: number,
    /**
     * The fraction of the total page width that can be printed on. This allows
     * limiting the length of printable text per line. Values must be between
     * `0` and `1` (`0.4` to `1` is typical).
     */
    readonly ribbonFraction: number
  ) {}

  [Hash.sym](): number {
    return Hash.combine(
      Hash.string("@effect/printer/PageWidth/AvailablePerLine"),
      Hash.combine(
        Hash.number(this.lineWidth),
        Hash.number(this.ribbonFraction)
      )
    )
  }

  [Equals.sym](u: unknown): boolean {
    return isAvailablePerLine(u) &&
      this.lineWidth === u.lineWidth &&
      this.ribbonFraction === u.ribbonFraction
  }
}

/**
 * Represents a `PageWidth` setting that informs the layout algorithms to avoid
 * introducing line breaks into a document.
 *
 * @tsplus type effect/printer/PageWidth/Unbounded
 */
export class Unbounded {
  readonly [PageWidthSym]: PageWidthSym = PageWidthSym

  readonly _tag = "Unbounded";

  [Hash.sym](): number {
    return Hash.string("@effect/printer/PageWidth/Unbounded")
  }

  [Equals.sym](u: unknown): boolean {
    return isUnbounded(u)
  }
}

/**
 * @tsplus type effect/printer/PageWidth.Ops
 */
export interface PageWidthOps {}
export const PageWidth: PageWidthOps = {}

/**
 * @tsplus type effect/printer/PageWidth/Aspects
 */
export interface PageWidthAspects {}

/**
 * @tsplus static effect/printer/PageWidth.Ops AvailablePerLine
 */
export function availablePerLine(lineWidth: number, ribbonFraction: number): PageWidth {
  return new AvailablePerLine(lineWidth, ribbonFraction)
}

/**
 * @tsplus static effect/printer/PageWidth.Ops Unbounded
 */
export const unbounded: PageWidth = new Unbounded()

/**
 * @tsplus static effect/printer/PageWidth.Ops default
 */
export const defaultPageWidth = new AvailablePerLine(80, 1)

/**
 * @tsplus static effect/printer/PageWidth.Ops isPageWidth
 */
export function isPageWidth(u: unknown): u is PageWidth {
  return typeof u === "object" && u != null && PageWidthSym in u
}

/**
 * @tsplus static effect/printer/PageWidth.Ops isAvailablePerLine
 */
export function isAvailablePerLine(u: unknown): u is AvailablePerLine {
  return isPageWidth(u) && u._tag === "AvailablePerLine"
}

/**
 * @tsplus static effect/printer/PageWidth.Ops isUnbounded
 */
export function isUnbounded(u: unknown): u is Unbounded {
  return isPageWidth(u) && u._tag === "Unbounded"
}
