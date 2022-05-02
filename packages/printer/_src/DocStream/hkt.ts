/**
 * @tsplus static ets/printer/DocStream/Ops Covariant
 */
export const CovariantDocStream = HKT.instance<Covariant<DocStreamF>>({
  map: (f) => (fa) => fa.map(f)
});
