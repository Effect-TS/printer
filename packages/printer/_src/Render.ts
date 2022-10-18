/**
 * @since 1.0.0
 */

import * as R from "@effect/printer/internal/Render"

// -----------------------------------------------------------------------------
// Rendering Algorithms
// -----------------------------------------------------------------------------

/**
 * Renders a `DocStream` to a `string`.
 *
 * **Note**: this method requires using a `Layout` algorithm to layout a `Doc`
 * into a `DocStream` prior to rendering.
 *
 * @tsplus static effect/printer/DocStream.Ops render
 * @tsplus getter effect/printer/DocStream render
 */
export const render: <A>(self: DocStream<A>) => string = R.render

/**
 * @tsplus static effect/printer/Doc.Ops renderCompact
 * @tsplus getter effect/printer/Doc renderCompact
 */
export const renderCompact: <A>(self: Doc<A>) => string = R.renderCompact

/**
 * @tsplus static effect/printer/Doc.Aspects renderPretty
 * @tsplus pipeable effect/printer/Doc renderPretty
 */
export const renderPretty: (
  lineWidth: number,
  ribbonFraction?: number
) => <A>(
  self: Doc<A>
) => string = R.renderPretty

/**
 * @tsplus static effect/printer/Doc.Ops renderPrettyDefault
 * @tsplus getter effect/printer/Doc renderPrettyDefault
 */
export const renderPrettyDefault: <A>(self: Doc<A>) => string = R.renderPrettyDefault

/**
 * @tsplus static effect/printer/Doc.Ops renderPrettyUnbounded
 * @tsplus getter effect/printer/Doc renderPrettyUnbounded
 */
export const renderPrettyUnbounded: <A>(self: Doc<A>) => string = R.renderPrettyUnbounded

/**
 * @tsplus static effect/printer/Doc.Aspects renderSmart
 * @tsplus pipeable effect/printer/Doc renderSmart
 */
export const renderSmart: <A>(
  lineWidth: number,
  ribbonFraction?: number
) => (
  self: Doc<A>
) => string = R.renderSmart

/**
 * @tsplus static effect/printer/Doc.Ops renderSmartDefault
 * @tsplus getter effect/printer/Doc renderSmartDefault
 */
export const renderSmartDefault: <A>(self: Doc<A>) => string = R.renderSmartDefault

/**
 * @tsplus static effect/printer/Doc.Ops renderSmartUnbounded
 * @tsplus getter effect/printer/Doc renderSmartUnbounded
 */
export const renderSmartUnbounded: <A>(self: Doc<A>) => string = R.renderSmartUnbounded
