/**
 * @tsplus fluent ets/printer/Flatten fold
 */
export function fold_<A, R>(
  flatten: Flatten<A>,
  patterns: {
    readonly Flattened: (value: A) => R
    readonly AlreadyFlat: () => R
    readonly NeverFlat: () => R
  }
): R {
  switch (flatten._tag) {
    case "Flattened":
      return patterns.Flattened(flatten.value)
    case "AlreadyFlat":
      return patterns.AlreadyFlat()
    case "NeverFlat":
      return patterns.NeverFlat()
  }
}

/**
 * @tsplus static ets/printer/Flatten/Aspects fold
 */
export const fold = Pipeable(fold_)
