/**
 * @tsplus static ets/printer/DocTree/Ops getAssociative
 */
export function getAssociative<A>(): Associative<DocTree<A>> {
  return Associative((x, y) => DocTree.concat(Chunk(x, y)))
}

/**
 * @tsplus static ets/printer/DocTree/Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A>(): AssociativeIdentity<DocTree<A>> {
  return AssociativeIdentity<DocTree<A>>(DocTree.empty, (x, y) => DocTree.concat(Chunk(x, y)))
}

/**
 * @tsplus static ets/printer/DocTree/Ops Covariant
 */
export const DocTreeCovariant = HKT.instance<Covariant<DocTreeF>>({
  map: (f) => (fa) => fa.map(f)
})
