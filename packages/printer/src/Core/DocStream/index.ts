// tracing: off

import type { Array } from "@effect-ts/core/Array"
import * as A from "@effect-ts/core/Array"
import { identity, pipe } from "@effect-ts/core/Function"
import type { Identity } from "@effect-ts/core/Identity"
import * as IO from "@effect-ts/core/IO"
import type { Option } from "@effect-ts/core/Option"
import * as O from "@effect-ts/core/Option"
import type { URI } from "@effect-ts/core/Prelude"
import * as P from "@effect-ts/core/Prelude"

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * Represents a document that has been laid out and can be processed used
 * by the rendering algorithms.
 *
 * A simplified view is that a `Doc` is equivalent to an array of `DocStream`,
 * and the layout algorithms simply pick a `DocStream` based upon which
 * instance best fits the layout constraints. Therefore, a `DocStream` has all
 * complexity contained in a `Doc` resolved, making it very easy to convert to
 * other formats, such as plaintext or terminal output.
 */
export type DocStream<A> =
  | FailedStream<A>
  | EmptyStream<A>
  | CharStream<A>
  | TextStream<A>
  | LineStream<A>
  | PushAnnotationStream<A>
  | PopAnnotationStream<A>

/**
 * Represents a `Doc` that failed to be laid out.
 */
export class FailedStream<A> {
  readonly _tag = "FailedStream"
  readonly _A!: () => A
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents the an empty `Doc`.
 */
export class EmptyStream<A> {
  readonly _tag = "EmptyStream"
  readonly _A!: () => A
  constructor(readonly id: (_: never) => A) {}
}

/**
 * Represents a `Doc` containing a single character.
 */
export class CharStream<A> {
  readonly _tag = "CharStream"
  readonly _A!: () => A
  constructor(readonly char: string, readonly stream: DocStream<A>) {}
}

/**
 * Represents a `Doc` containing a string of text.
 */
export class TextStream<A> {
  readonly _tag = "TextStream"
  readonly _A!: () => A
  constructor(readonly text: string, readonly stream: DocStream<A>) {}
}

/**
 * Represents a `Doc` containing a single line. The `indentation`
 * represents the indentation level for the subsequent line in the
 * `Doc`.
 */
export class LineStream<A> {
  readonly _tag = "LineStream"
  readonly _A!: () => A
  constructor(readonly indentation: number, readonly stream: DocStream<A>) {}
}

/**
 * Represents the addition of an annotation of type `A` to a `Doc`.
 */
export class PushAnnotationStream<A> {
  readonly _tag = "PushAnnotationStream"
  readonly _A!: () => A
  constructor(readonly annotation: A, readonly stream: DocStream<A>) {}
}

/**
 * Represents the removal of a previously pushed annotation from a `Doc`.
 */
export class PopAnnotationStream<A> {
  readonly _tag = "PopAnnotationStream"
  readonly _A!: () => A
  constructor(readonly stream: DocStream<A>) {}
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const failed: DocStream<never> = new FailedStream(identity)

export const empty: DocStream<never> = new EmptyStream(identity)

export const char = <A>(char: string, stream: DocStream<A>): DocStream<A> =>
  new CharStream(char, stream)

export const text = <A>(text: string, stream: DocStream<A>): DocStream<A> =>
  new TextStream(text, stream)

export const line = <A>(indentation: number, stream: DocStream<A>): DocStream<A> =>
  new LineStream(indentation, stream)

export const pushAnnotation = <A>(annotation: A, stream: DocStream<A>): DocStream<A> =>
  new PushAnnotationStream(annotation, stream)

export const popAnnotation = <A>(stream: DocStream<A>): DocStream<A> =>
  new PopAnnotationStream(stream)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

export const match = <A, R>(patterns: {
  readonly FailedStream: () => R
  readonly EmptyStream: () => R
  readonly CharStream: (char: string, stream: DocStream<A>) => R
  readonly TextStream: (text: string, stream: DocStream<A>) => R
  readonly LineStream: (indentation: number, stream: DocStream<A>) => R
  readonly PushAnnotationStream: (annotation: A, stream: DocStream<A>) => R
  readonly PopAnnotationStream: (stream: DocStream<A>) => R
}): ((stream: DocStream<A>) => R) => {
  const f = (x: DocStream<A>): R => {
    switch (x._tag) {
      case "FailedStream":
        return patterns.FailedStream()
      case "EmptyStream":
        return patterns.EmptyStream()
      case "CharStream":
        return patterns.CharStream(x.char, x.stream)
      case "TextStream":
        return patterns.TextStream(x.text, x.stream)
      case "LineStream":
        return patterns.LineStream(x.indentation, x.stream)
      case "PushAnnotationStream":
        return patterns.PushAnnotationStream(x.annotation, x.stream)
      case "PopAnnotationStream":
        return patterns.PopAnnotationStream(x.stream)
    }
  }
  return f
}

// -------------------------------------------------------------------------------------
// operations
// -------------------------------------------------------------------------------------

export const isFailed = <A>(stream: DocStream<A>): stream is FailedStream<A> =>
  stream._tag === "FailedStream"

export const isEmptyStream = <A>(stream: DocStream<A>): stream is EmptyStream<A> =>
  stream._tag === "EmptyStream"

export const isCharStream = <A>(stream: DocStream<A>): stream is CharStream<A> =>
  stream._tag === "CharStream"

export const isTextStream = <A>(stream: DocStream<A>): stream is TextStream<A> =>
  stream._tag === "TextStream"

export const isLineStream = <A>(stream: DocStream<A>): stream is LineStream<A> =>
  stream._tag === "LineStream"

export const isPushAnnotation = <A>(
  stream: DocStream<A>
): stream is PushAnnotationStream<A> => stream._tag === "PushAnnotationStream"

export const isPopAnnotation = <A>(
  stream: DocStream<A>
): stream is PopAnnotationStream<A> => stream._tag === "PopAnnotationStream"

export const map = <A, B>(f: (a: A) => B): ((fa: DocStream<A>) => DocStream<B>) =>
  reAnnotate(f)

export const foldMap = <I>(I: Identity<I>) => <A>(
  f: (a: A) => I
): ((fa: DocStream<A>) => I) => {
  const go = (x: DocStream<A>): IO.IO<I> =>
    IO.gen(function* (_) {
      switch (x._tag) {
        case "CharStream":
          return yield* _(go(x.stream))
        case "TextStream":
          return yield* _(go(x.stream))
        case "LineStream":
          return yield* _(go(x.stream))
        case "PushAnnotationStream":
          return I.combine(f(x.annotation), yield* _(go(x.stream)))
        case "PopAnnotationStream":
          return yield* _(go(x.stream))
        default:
          return I.identity
      }
    })
  return (_) => IO.run(go(_))
}

/**
 * Modify the annotations of a document.
 */
export const reAnnotate = <A, B>(
  f: (a: A) => B
): ((stream: DocStream<A>) => DocStream<B>) => {
  const go = (x: DocStream<A>): IO.IO<DocStream<B>> =>
    IO.gen(function* (_) {
      switch (x._tag) {
        case "CharStream":
          return char(x.char, yield* _(go(x.stream)))
        case "TextStream":
          return text(x.text, yield* _(go(x.stream)))
        case "LineStream":
          return line(x.indentation, yield* _(go(x.stream)))
        case "PushAnnotationStream":
          return pushAnnotation(f(x.annotation), yield* _(go(x.stream)))
        case "PopAnnotationStream":
          return yield* _(go(x.stream))
        case "FailedStream":
          return failed
        case "EmptyStream":
          return empty
      }
    })
  return (_) => IO.run(go(_))
}

/**
 * Remove all annotations from a document.
 *
 * @category utils
 * @since 0.0.1
 */
export const unAnnotate = <A>(stream: DocStream<A>): DocStream<never> => {
  const go = (x: DocStream<A>): IO.IO<DocStream<never>> =>
    IO.gen(function* (_) {
      switch (x._tag) {
        case "CharStream":
          return char(x.char, yield* _(go(x.stream)))
        case "TextStream":
          return text(x.text, yield* _(go(x.stream)))
        case "LineStream":
          return line(x.indentation, yield* _(go(x.stream)))
        case "PushAnnotationStream":
          return yield* _(go(x.stream))
        case "PopAnnotationStream":
          return yield* _(go(x.stream))
        case "FailedStream":
          return failed
        case "EmptyStream":
          return empty
      }
    })
  return pipe(go(stream), IO.run)
}

type AnnotationRemoval = "Remove" | "DontRemove"

const Remove: AnnotationRemoval = "Remove"

const DontRemove: AnnotationRemoval = "DontRemove"

/**
 * Changes the annotation of a document to a different annotation, or to
 * none at all.
 */
export const alterAnnotation = <A, B>(
  f: (a: A) => Option<B>
): ((stream: DocStream<A>) => DocStream<B>) => {
  const go = (stack: Array<AnnotationRemoval>) => (
    x: DocStream<A>
  ): IO.IO<DocStream<B>> =>
    IO.gen(function* (_) {
      switch (x._tag) {
        case "CharStream":
          return char(x.char, yield* _(go(stack)(x.stream)))
        case "TextStream":
          return text(x.text, yield* _(go(stack)(x.stream)))
        case "LineStream":
          return line(x.indentation, yield* _(go(stack)(x.stream)))
        case "PushAnnotationStream": {
          const altered = f(x.annotation)
          if (O.isSome(altered)) {
            const s = yield* _(
              go(A.cons_<AnnotationRemoval>(stack, DontRemove))(x.stream)
            )
            return pushAnnotation(altered.value, s)
          }
          return yield* _(go(A.cons_<AnnotationRemoval>(stack, Remove))(x.stream))
        }
        case "PopAnnotationStream": {
          if (A.isEmpty(stack)) {
            throw new Error("bug, we ended up with an empty stack to pop from!")
          }
          const [head, ...tail] = stack
          if (head === DontRemove) {
            return popAnnotation(yield* _(go(tail)(x.stream)))
          }
          return yield* _(go(tail)(x.stream))
        }
        case "FailedStream":
          return failed
        case "EmptyStream":
          return empty
      }
    })
  return (_) => IO.run(go(A.empty)(_))
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

export const DocStreamURI = "@effect-ts/pretty/DocStream"

export type DocStreamURI = typeof DocStreamURI

declare module "@effect-ts/core/Prelude/HKT" {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface URItoKind<FC, TC, K, Q, W, X, I, S, R, E, A> {
    readonly [DocStreamURI]: DocStream<A>
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export const Covariant = P.instance<P.Covariant<[URI<DocStreamURI>]>>({
  map
})