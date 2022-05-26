/**
 * Represents the options that will influence the layout algorithms.
 *
 * @tsplus type ets/printer/Layout/Options
 */
export interface LayoutOptions {
  readonly pageWidth: PageWidth
}

/**
 * @tsplus type ets/printer/Layout/Options/Ops
 */
export interface LayoutOptionsOps {}
export const LayoutOptions: LayoutOptionsOps = {}

/**
 * @tsplus static ets/printer/Layout/Options/Ops __call
 */
export function layoutOptions(pageWidth: PageWidth): LayoutOptions {
  return {
    pageWidth
  }
}

/**
 * The default layout options, which are suitable when you want to obtain output
 * but do not care about the details.
 *
 * @tsplus static ets/printer/Layout/Options/Ops default
 */
export const defaultLayoutOptions = layoutOptions(PageWidth.default)
