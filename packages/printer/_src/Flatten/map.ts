/**
 * @tsplus fluent ets/printer/Flatten map
 */
export function map_<A, B>(self: Flatten<A>, f: (a: A) => B): Flatten<B> {
  return self.fold<A, Flatten<B>>({
    Flattened: (a) => Flatten.Flattened(f(a)),
    AlreadyFlat: () => Flatten.AlreadyFlat,
    NeverFlat: () => Flatten.NeverFlat
  })
}

/**
 * @tsplus static ets/printer/Flatten/Aspects map
 */
export const map = Pipeable(map_)
