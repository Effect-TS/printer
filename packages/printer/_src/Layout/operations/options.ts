/**
 * Represents the options that will influence the layout algorithms.
 *
 * @tsplus type effect/printer/Layout.Options
 */
export interface LayoutOptions {
  readonly pageWidth: PageWidth
}

/**
 * @tsplus type effect/printer/Layout.Options.Ops
 */
export interface LayoutOptionsOps {
  (pageWidth: PageWidth): LayoutOptions
}
/**
 * @tsplus static effect/printer/Layout.Ops Options
 */
export const LayoutOptions: LayoutOptionsOps = (pageWidth) => ({ pageWidth })

/**
 * The default layout options, which are suitable when you want to obtain output
 * but do not care about the details.
 *
 * @tsplus static effect/printer/Layout.Options.Ops default
 */
export const defaultLayoutOptions = LayoutOptions(PageWidth.default)
