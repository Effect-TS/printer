/**
 * Represents a document that has been laid out into a tree-like structure.
 *
 * A `DocStream` is a linked list of different annotated cons cells (i.e.
 * `TextStream` and then some further `DocStream`, `LineStream` and then some
 * further `DocStream`, etc.). The `DocStream` format is quite suitable as a
 * target for a layout engine, but is not suitable for rendering to a more
 * structured format, such as HTML, where we do not want to perform a lookahead
 * until the end of some pre-defined markup. These formats would benefit more
 * from a tree-like structure that explicitly marks its contents as annotated.
 * A `DocTree` is therefore much more suitable for this use case.
 *
 * @tsplus type effect/printer/DocTree
 */
export type DocTree<A> =
  | EmptyTree<A>
  | CharTree<A>
  | TextTree<A>
  | LineTree<A>
  | AnnotationTree<A>
  | ConcatTree<A>

/**
 * @tsplus type effect/printer/DocTree.Ops
 */
export interface DocTreeOps {
  $: DocTreeAspects
}
export const DocTree: DocTreeOps = {
  $: {}
}

export interface DocTreeF extends HKT {
  readonly type: DocTree<this["A"]>
}

/**
 * @tsplus type effect/printer/DocTree.Aspects
 */
export interface DocTreeAspects {}

/**
 * @tsplus unify effect/printer/DocTree
 * @tsplus unify effect/printer/DocTree/Empty
 * @tsplus unify effect/printer/DocTree/Char
 * @tsplus unify effect/printer/DocTree/Text
 * @tsplus unify effect/printer/DocTree/Line
 * @tsplus unify effect/printer/DocTree/Annotation
 * @tsplus unify effect/printer/DocTree/Concat
 */
export function unifyDocTree<X extends DocTree<any>>(
  self: X
): DocTree<
  [X] extends [{ _A: () => infer A }] ? A : never
> {
  return self
}

/**
 * @tsplus type effect/printer/DocTree/Empty
 */
export class EmptyTree<A> {
  readonly _tag = "EmptyTree"
  readonly _A!: () => A
  constructor(readonly id: (_: never) => A) {}
}

/**
 * @tsplus type effect/printer/DocTree/Char
 */
export class CharTree<A> {
  readonly _tag = "CharTree"
  readonly _A!: () => A
  constructor(readonly char: string, readonly id: (_: never) => A) {}
}

/**
 * @tsplus type effect/printer/DocTree/Text
 */
export class TextTree<A> {
  readonly _tag = "TextTree"
  readonly _A!: () => A
  constructor(readonly text: string, readonly id: (_: never) => A) {}
}

/**
 * @tsplus type effect/printer/DocTree/Line
 */
export class LineTree<A> {
  readonly _tag = "LineTree"
  readonly _A!: () => A
  constructor(readonly indentation: number, readonly id: (_: never) => A) {}
}

/**
 * @tsplus type effect/printer/DocTree/Annotation
 */
export class AnnotationTree<A> {
  readonly _tag = "AnnotationTree"
  readonly _A!: () => A
  constructor(readonly annotation: A, readonly tree: DocTree<A>) {}
}

/**
 * @tsplus type effect/printer/DocTree/Concat
 */
export class ConcatTree<A> {
  readonly _tag = "ConcatTree"
  readonly _A!: () => A
  constructor(readonly trees: Chunk<DocTree<A>>) {}
}

/**
 * @tsplus static effect/printer/DocTree.Ops empty
 */
export const empty: DocTree<never> = new EmptyTree(identity)

/**
 * @tsplus static effect/printer/DocTree.Ops char
 */
export function char<A>(char: string): DocTree<A> {
  return new CharTree(char, identity)
}

/**
 * @tsplus static effect/printer/DocTree.Ops text
 */
export function text<A>(text: string): DocTree<A> {
  return new TextTree(text, identity)
}

/**
 * @tsplus static effect/printer/DocTree.Ops line
 */
export function line<A>(indentation: number): DocTree<A> {
  return new LineTree(indentation, identity)
}

/**
 * Annotate the specified `DocTree` with an annotation of type `A`.
 *
 * @tsplus static effect/printer/DocTree.Ops annotation
 */
export function annotation<A>(tree: DocTree<A>, annotation: A): DocTree<A> {
  return new AnnotationTree(annotation, tree)
}

/**
 * Horizontally concatenates multiple `DocTree`s.
 *
 * @tsplus static effect/printer/DocTree.Ops concat
 */
export function concat<A>(trees: Chunk<DocTree<A>>): DocTree<A> {
  return new ConcatTree(trees)
}
