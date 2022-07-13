/**
 * @tsplus static effect/printer/Flatten.Aspects map
 * @tsplus pipeable effect/printer/Flatten map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: Flatten<A>): Flatten<B> =>
    self.fold<A, Flatten<B>>({
      Flattened: (a) => Flatten.Flattened(f(a)),
      AlreadyFlat: () => Flatten.AlreadyFlat,
      NeverFlat: () => Flatten.NeverFlat
    })
}
