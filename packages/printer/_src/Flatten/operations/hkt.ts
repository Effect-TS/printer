/**
 * @tsplus static effect/printer/Flatten.Ops Covariant
 */
export const CovariantFlatten = HKT.instance<Covariant<FlattenF>>({
  map: (f) => (fa) => fa.map(f)
})
