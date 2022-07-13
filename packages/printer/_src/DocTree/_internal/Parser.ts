/**
 * @tsplus type effect/printer/DocTree.Parser
 */
export interface Parser<S, A> {
  (stream: S): Maybe<Tuple<[A, S]>>
}

/**
 * @tsplus type effect/printer/DocTree.Parser.Ops
 */
export interface ParserOps {}
export const Parser: ParserOps = {}

export interface ParserF<S> extends HKT {
  readonly type: Parser<S, this["A"]>
}

/**
 * @tsplus static effect/printer/DocTree.Parser.Ops getAssociativeEither
 */
export function getAssociativeEither<S>() {
  return HKT.instance<AssociativeEither<ParserF<S>>>({
    orElseEither: (that) =>
      (parser) =>
        (stream) =>
          parser(stream).map((result) => result.update(0, Either.left)).orElse(
            that()(stream).fold(
              Either.left(Maybe.none),
              (result) => Maybe.some(result.update(0, Either.right))
            ) as Maybe<Tuple<[Either<any, any>, S]>>
          )
  })
}

/**
 * @tsplus static effect/printer/DocTree.Parser.Ops getMonad
 */
export function getMonad<S>() {
  return HKT.instance<Monad<ParserF<S>>>({
    any: () => (s) => Maybe.some(Tuple({}, s)),
    flatten: (ffa) => (s1) => ffa(s1).flatMap(({ tuple: [fa, s2] }) => fa(s2)),
    map: (f) => (parser) => (stream) => parser(stream).map((result) => result.update(0, f))
  })
}

/**
 * @tsplus static effect/printer/DocTree.Parser.Ops getChainRec
 */
export function getChainRec<S>() {
  return HKT.instance<ChainRec<ParserF<S>>>({
    chainRec: (f) =>
      (a) =>
        (start) => {
          return ChainRec.tailRec({ value: a, stream: start }, (state) => {
            const result = f(state.value)(state.stream)

            if (result.isNone()) {
              return Either.right(Maybe.none)
            }

            const { tuple: [cont, stream] } = result.value

            return cont.isLeft()
              ? Either.left({ value: cont.left, stream })
              : Either.right(Maybe.some(Tuple(cont.right, stream)))
          })
        }
  })
}
