/**
 * @tsplus type ets/printer/DocToken
 */
export type DocToken<A> =
  | EmptyToken<A>
  | CharToken<A>
  | TextToken<A>
  | LineToken<A>
  | PushAnnotationToken<A>
  | PopAnnotationToken<A>;

/**
 * @tsplus type ets/printer/DocToken/Ops
 */
export interface DocTokenOps {}
export const DocToken: DocTokenOps = {};

/**
 * @tsplus unify ets/printer/DocToken
 * @tsplus unify ets/printer/DocToken/Empty
 * @tsplus unify ets/printer/DocToken/Char
 * @tsplus unify ets/printer/DocToken/Text
 * @tsplus unify ets/printer/DocToken/Line
 * @tsplus unify ets/printer/DocToken/PushAnnotation
 * @tsplus unify ets/printer/DocToken/PopAnnotation
 */
export function unifyDocToken<X extends DocToken<any>>(
  self: X
): DocToken<
  [X] extends [{ _A: () => infer A; }] ? A : never
> {
  return self;
}

/**
 * @tsplus type ets/printer/DocToken/Empty
 */
export class EmptyToken<A> {
  readonly _tag = "EmptyToken";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * @tsplus type ets/printer/DocToken/Char
 */
export class CharToken<A> {
  readonly _tag = "CharToken";
  readonly _A!: () => A;
  constructor(readonly char: string, readonly id: (_: never) => A) {}
}

/**
 * @tsplus type ets/printer/DocToken/Text
 */
export class TextToken<A> {
  readonly _tag = "TextToken";
  readonly _A!: () => A;
  constructor(readonly text: string, readonly id: (_: never) => A) {}
}

/**
 * @tsplus type ets/printer/DocToken/Line
 */
export class LineToken<A> {
  readonly _tag = "LineToken";
  readonly _A!: () => A;
  constructor(readonly indentation: number, readonly id: (_: never) => A) {}
}

/**
 * @tsplus type ets/printer/DocToken/PushAnnotation
 */
export class PushAnnotationToken<A> {
  readonly _tag = "PushAnnotationToken";
  readonly _A!: () => A;
  constructor(readonly annotation: A) {}
}

/**
 * @tsplus type ets/printer/DocToken/PopAnnotation
 */
export class PopAnnotationToken<A> {
  readonly _tag = "PopAnnotationToken";
  readonly _A!: () => A;
  constructor(readonly id: (_: never) => A) {}
}

/**
 * @tsplus static ets/printer/DocToken/Ops empty
 */
export const empty: DocToken<never> = new EmptyToken(identity);

/**
 * @tsplus static ets/printer/DocToken/Ops char
 */
export function char<A>(char: string): DocToken<A> {
  return new CharToken(char, identity);
}

/**
 * @tsplus static ets/printer/DocToken/Ops text
 */
export function text<A>(text: string): DocToken<A> {
  return new TextToken(text, identity);
}

/**
 * @tsplus static ets/printer/DocToken/Ops line
 */
export function line<A>(indentation: number): DocToken<A> {
  return new LineToken(indentation, identity);
}

/**
 * @tsplus static ets/printer/DocToken/Ops pushAnnotation
 */
export function pushAnnotation<A>(annotation: A): DocToken<A> {
  return new PushAnnotationToken(annotation);
}

/**
 * @tsplus static ets/printer/DocToken/Ops popAnnotation
 */
export const popAnnotation: DocToken<never> = new PopAnnotationToken(identity);
