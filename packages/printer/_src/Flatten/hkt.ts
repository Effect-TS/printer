/**
 * @tsplus static ets/printer/Flatten/Ops Covariant
 */
export const CovariantFlatten = HKT.instance<Covariant<FlattenF>>({
  map: (f) => (fa) => fa.map(f)
});
