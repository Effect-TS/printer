/**
 * @tsplus static effect/printer/DocStream.Aspects foldMap
 * @tsplus pipeable effect/printer/DocStream foldMap
 */
export function foldMap<A, I>(I: AssociativeIdentity<I>, f: (a: A) => I) {
  return (self: DocStream<A>): I => foldMapSafe(self, I, f).run
}

function foldMapSafe<A, I>(self: DocStream<A>, I: AssociativeIdentity<I>, f: (a: A) => I): Eval<I> {
  switch (self._tag) {
    case "CharStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f))
    }
    case "TextStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f))
    }
    case "LineStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f))
    }
    case "PushAnnotationStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f)).map((i) => I.combine(f(self.annotation), i))
    }
    case "PopAnnotationStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f))
    }
    default: {
      return Eval.succeed(I.identity)
    }
  }
}
