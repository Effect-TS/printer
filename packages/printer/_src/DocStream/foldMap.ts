/**
 * @tsplus fluent ets/printer/DocStream foldMap
 */
export function foldMap_<A, I>(self: DocStream<A>, I: AssociativeIdentity<I>, f: (a: A) => I): I {
  return foldMapSafe(self, I, f).run();
}

/**
 * @tsplus static ets/printer/DocStream/Aspects foldMap
 */
export const foldMap = Pipeable(foldMap_);

function foldMapSafe<A, I>(self: DocStream<A>, I: AssociativeIdentity<I>, f: (a: A) => I): Eval<I> {
  switch (self._tag) {
    case "CharStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f));
    }
    case "TextStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f));
    }
    case "LineStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f));
    }
    case "PushAnnotationStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f)).map((i) => I.combine(f(self.annotation), i));
    }
    case "PopAnnotationStream": {
      return Eval.suspend(foldMapSafe(self.stream, I, f));
    }
    default: {
      return Eval.succeed(I.identity);
    }
  }
}
