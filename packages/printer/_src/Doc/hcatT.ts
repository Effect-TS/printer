type NonEmptyArrayDoc = Array<Doc<any>> & { readonly 0: Doc<any>; };

/**
 * Tupled variant of `hcat`.
 *
 * @tsplus static ets/printer/Doc/Ops hcatT
 */
export function hcatT<Docs extends NonEmptyArrayDoc>(
  ...docs: Docs
): Doc<
  [Docs[number]] extends [{ _A: () => infer A; }] ? A : never
> {
  return Doc.hcat(docs);
}
