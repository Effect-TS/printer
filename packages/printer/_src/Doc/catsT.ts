type NonEmptyArrayDoc = Array<Doc<any>> & { readonly 0: Doc<any>; };

/**
 * Tupled variant of `cats`.
 *
 * @tsplus static ets/printer/Doc/Ops catsT
 */
export function catsT<Docs extends NonEmptyArrayDoc>(
  ...docs: Docs
): Doc<
  [Docs[number]] extends [{ _A: () => infer A; }] ? A : never
> {
  return Doc.cats(docs);
}
