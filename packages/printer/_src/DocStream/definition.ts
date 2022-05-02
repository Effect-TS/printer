/**
 * Represents a document that has been laid out and can be processed used by the
 * rendering algorithms.
 *
 * A simplified view is that a `Doc` is equivalent to an array of `DocStream`,
 * and the layout algorithms simply pick a `DocStream` based upon which instance
 * best fits the layout constraints. Therefore, a `DocStream` has all complexity
 * contained in a `Doc` resolved, making it very easy to convert to other
 * formats, such as plaintext or terminal output.
 *
 * @tsplus type ets/printer/DocStream
 */
export type DocStream<A> =
  | FailedStream<A>
  | EmptyStream<A>
  | CharStream<A>
  | TextStream<A>
  | LineStream<A>
  | PushAnnotationStream<A>
  | PopAnnotationStream<A>;

/**
 * @tsplus type ets/printer/DocStream/Ops
 */
export interface DocStreamOps {
  $: DocStreamAspects;
}
export const DocStream: DocStreamOps = {
  $: {}
};

export interface DocStreamF extends HKT {
  readonly type: DocStream<this["A"]>;
}

/**
 * @tsplus type ets/printer/DocStream/Aspects
 */
export interface DocStreamAspects {}

/**
 * @tsplus unify ets/printer/DocStream
 * @tsplus unify ets/printer/DocStream/FailedStream
 * @tsplus unify ets/printer/DocStream/EmptyStream
 * @tsplus unify ets/printer/DocStream/CharStream
 * @tsplus unify ets/printer/DocStream/TextStream
 * @tsplus unify ets/printer/DocStream/LineStream
 * @tsplus unify ets/printer/DocStream/PushAnnotationStream
 * @tsplus unify ets/printer/DocStream/PopAnnotationStream
 */
export function unifyDocStream<X extends DocStream<any>>(
  self: X
): DocStream<
  [X] extends [DocStream<infer AX>] ? AX : never
> {
  return self;
}

/**
 * Represents a `Doc` that failed to be laid out.
 *
 * @tsplus type ets/printer/DocStream/FailedStream
 */
export class FailedStream<A> {
  readonly _tag = "FailedStream";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents the an empty `Doc`.
 *
 * @tsplus type ets/printer/DocStream/EmptyStream
 */
export class EmptyStream<A> {
  readonly _tag = "EmptyStream";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents a `Doc` containing a single character.
 *
 * @tsplus type ets/printer/DocStream/CharStream
 */
export class CharStream<A> {
  readonly _tag = "CharStream";
  readonly _A!: () => A;
  constructor(readonly char: string, readonly stream: DocStream<A>) {}
}

/**
 * Represents a `Doc` containing a string of text.
 *
 * @tsplus type ets/printer/DocStream/TextStream
 */
export class TextStream<A> {
  readonly _tag = "TextStream";
  readonly _A!: () => A;
  constructor(readonly text: string, readonly stream: DocStream<A>) {}
}

/**
 * Represents a `Doc` containing a single line. The `indentation`
 * represents the indentation level for the subsequent line in the
 * `Doc`.
 *
 * @tsplus type ets/printer/DocStream/LineStream
 */
export class LineStream<A> {
  readonly _tag = "LineStream";
  readonly _A!: () => A;
  constructor(readonly indentation: number, readonly stream: DocStream<A>) {}
}

/**
 * Represents the addition of an annotation of type `A` to a `Doc`.
 *
 * @tsplus type ets/printer/DocStream/PushAnnotationStream
 */
export class PushAnnotationStream<A> {
  readonly _tag = "PushAnnotationStream";
  readonly _A!: () => A;
  constructor(readonly annotation: A, readonly stream: DocStream<A>) {}
}

/**
 * Represents the removal of a previously pushed annotation from a `Doc`.
 *
 * @tsplus type ets/printer/DocStream/PopAnnotationStream
 */
export class PopAnnotationStream<A> {
  readonly _tag = "PopAnnotationStream";
  readonly _A!: () => A;
  constructor(readonly stream: DocStream<A>) {}
}

/**
 * @tsplus static ets/printer/DocStream/Ops failed
 */
export const failed: DocStream<never> = new FailedStream(identity);

/**
 * @tsplus static ets/printer/DocStream/Ops empty
 */
export const empty: DocStream<never> = new EmptyStream(identity);

/**
 * @tsplus static ets/printer/DocStream/Ops char
 */
export function char<A>(stream: DocStream<A>, char: string): DocStream<A> {
  return new CharStream(char, stream);
}

/**
 * @tsplus static ets/printer/DocStream/Ops text
 */
export function text<A>(stream: DocStream<A>, text: string): DocStream<A> {
  return new TextStream(text, stream);
}

/**
 * @tsplus static ets/printer/DocStream/Ops line
 */
export function line_<A>(stream: DocStream<A>, indentation: number): DocStream<A> {
  return new LineStream(indentation, stream);
}

/**
 * @tsplus static ets/printer/DocStream/Ops pushAnnotation
 */
export function pushAnnotation<A, B>(
  stream: DocStream<B>,
  annotation: A
): DocStream<A | B> {
  return new PushAnnotationStream<A | B>(annotation, stream);
}

/**
 * @tsplus static ets/printer/DocStream/Ops popAnnotation
 */
export function popAnnotation<A>(stream: DocStream<A>): DocStream<A> {
  return new PopAnnotationStream(stream);
}

/**
 * @tsplus static ets/printer/DocStream/Ops isFailedStream
 */
export function isFailedStream<A>(stream: DocStream<A>): stream is FailedStream<A> {
  return stream._tag === "FailedStream";
}

/**
 * @tsplus static ets/printer/DocStream/Ops isEmptyStream
 */
export function isEmptyStream<A>(stream: DocStream<A>): stream is EmptyStream<A> {
  return stream._tag === "EmptyStream";
}

/**
 * @tsplus static ets/printer/DocStream/Ops isCharStream
 */
export function isCharStream<A>(stream: DocStream<A>): stream is CharStream<A> {
  return stream._tag === "CharStream";
}

/**
 * @tsplus static ets/printer/DocStream/Ops isTextStream
 */
export function isTextStream<A>(stream: DocStream<A>): stream is TextStream<A> {
  return stream._tag === "TextStream";
}

/**
 * @tsplus static ets/printer/DocStream/Ops isLineStream
 */
export function isLineStream<A>(stream: DocStream<A>): stream is LineStream<A> {
  return stream._tag === "LineStream";
}

/**
 * @tsplus static ets/printer/DocStream/Ops isPushAnnotationStream
 */
export function isPushAnnotationStream<A>(
  stream: DocStream<A>
): stream is PushAnnotationStream<A> {
  return stream._tag === "PushAnnotationStream";
}

/**
 * @tsplus static ets/printer/DocStream/Ops isPopAnnotationStream
 */
export function isPopAnnotationStream<A>(
  stream: DocStream<A>
): stream is PopAnnotationStream<A> {
  return stream._tag === "PopAnnotationStream";
}
