/**
 * @tsplus static ets/printer/Doc/Ops getAssociative
 */
export function getAssociative<A>(): Associative<Doc<A>> {
  return Associative(Doc.cat);
}

/**
 * @tsplus static ets/printer/Doc/Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A>(): AssociativeIdentity<Doc<A>> {
  return AssociativeIdentity<Doc<A>>(Doc.empty, Doc.cat);
}

/**
 * @tsplus static ets/printer/Doc/Ops Covariant
 */
export const CovariantDoc = HKT.instance<Covariant<DocF>>({
  map: (f) => (fa) => fa.map(f)
});
