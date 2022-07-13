/**
 * @tsplus static effect/printer/Flatten.Aspects fold
 * @tsplus pipeable effect/printer/Flatten fold
 */
export function fold<A, R>(
  patterns: {
    readonly Flattened: (value: A) => R
    readonly AlreadyFlat: () => R
    readonly NeverFlat: () => R
  }
) {
  return (flatten: Flatten<A>): R => {
    switch (flatten._tag) {
      case "Flattened":
        return patterns.Flattened(flatten.value)
      case "AlreadyFlat":
        return patterns.AlreadyFlat()
      case "NeverFlat":
        return patterns.NeverFlat()
    }
  }
}
