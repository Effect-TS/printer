/**
 * The `optimize` function will combine text nodes so that they can be rendered
 * more efficiently. An optimized document is always laid out in an identical
 * manner to its un-optimized counterpart.
 *
 * When laying a `Doc` out to a `SimpleDocStream`, every component of the input
 * document is translated directly to the simpler output format. This sometimes
 * yields undesirable chunking when many pieces have been concatenated together.
 *
 * It is therefore a good idea to run `fuse` on concatenations of lots of small
 * strings that are used many times.
 *
 * ```typescript
 * import * as D from "../src/Core/Doc"
 *
 * // The document below contains a chain of four entries in the output
 * // `DocStream`
 * const doc1 = D.hsepT(D.char("a"), D.char("b"), D.char("c"), D.char("d"))
 *
 * // but is fully equivalent to the tightly packed document below which is only
 * // a single entry in the output `DocStream` and can be processed much more
 * // efficiently.
 * const doc2 = D.text("abcd")
 * ```
 *
 * @tsplus fluent ets/printer/Doc optimize
 */
export function optimize_<A>(self: Doc<A>, depth: Optimize.Depth): Doc<A> {
  return optimizeSafe(self, depth).run();
}

/**
 * The `optimize` function will combine text nodes so that they can be rendered
 * more efficiently. An optimized document is always laid out in an identical
 * manner to its un-optimized counterpart.
 *
 * When laying a `Doc` out to a `SimpleDocStream`, every component of the input
 * document is translated directly to the simpler output format. This sometimes
 * yields undesirable chunking when many pieces have been concatenated together.
 *
 * It is therefore a good idea to run `fuse` on concatenations of lots of small
 * strings that are used many times.
 *
 * ```typescript
 * import * as D from "../src/Core/Doc"
 *
 * // The document below contains a chain of four entries in the output
 * // `DocStream`
 * const doc1 = D.hsepT(D.char("a"), D.char("b"), D.char("c"), D.char("d"))
 *
 * // but is fully equivalent to the tightly packed document below which is only
 * // a single entry in the output `DocStream` and can be processed much more
 * // efficiently.
 * const doc2 = D.text("abcd")
 * ```
 *
 * @tsplus static ets/printer/Doc/Aspects optimize
 */
export const optimize = Pipeable(optimize_);

function optimizeSafe<A>(self: Doc<A>, depth: Optimize.Depth): Eval<Doc<A>> {
  switch (self._tag) {
    case "FlatAlt": {
      return Eval.suspend(optimizeSafe(self.left, depth)).zipWith(
        Eval.suspend(optimizeSafe(self.right, depth)),
        Doc.flatAlt
      );
    }
    case "Cat": {
      // Empty documents
      if (Doc.isEmpty(self.left)) {
        return Eval.suspend(optimizeSafe(self.right, depth));
      }
      if (Doc.isEmpty(self.right)) {
        return Eval.suspend(optimizeSafe(self.left, depth));
      }
      // String documents
      if (Doc.isChar(self.left) && Doc.isChar(self.right)) {
        return Eval.succeed(Doc.text(self.left.char + self.right.char));
      }
      if (Doc.isText(self.left) && Doc.isChar(self.right)) {
        return Eval.succeed(Doc.text(self.left.text + self.right.char));
      }
      if (Doc.isChar(self.left) && Doc.isText(self.right)) {
        return Eval.succeed(Doc.text(self.left.char + self.right.text));
      }
      if (Doc.isText(self.left) && Doc.isText(self.right)) {
        return Eval.succeed(Doc.text(self.left.text + self.right.text));
      }
      // Nested strings
      if (Doc.isChar(self.left) && Doc.isCat(self.right) && Doc.isChar(self.right.left)) {
        const right = self.right.right;
        return Eval.suspend(optimizeSafe(Doc.cat(self.left, self.right.left), depth)).flatMap((inner) =>
          Eval.suspend(optimizeSafe(Doc.cat(inner, right), depth))
        );
      }
      if (Doc.isText(self.left) && Doc.isCat(self.right) && Doc.isChar(self.right.left)) {
        const right = self.right.right;
        return Eval.suspend(optimizeSafe(Doc.cat(self.left, self.right.left), depth)).flatMap((inner) =>
          Eval.suspend(optimizeSafe(Doc.cat(inner, right), depth))
        );
      }
      if (Doc.isChar(self.left) && Doc.isCat(self.right) && Doc.isText(self.right.left)) {
        const right = self.right.right;
        return Eval.suspend(optimizeSafe(Doc.cat(self.left, self.right.left), depth)).flatMap((inner) =>
          Eval.suspend(optimizeSafe(Doc.cat(inner, right), depth))
        );
      }
      if (Doc.isText(self.left) && Doc.isCat(self.right) && Doc.isText(self.right.left)) {
        const right = self.right.right;
        return Eval.suspend(optimizeSafe(Doc.cat(self.left, self.right.left), depth)).flatMap((inner) =>
          Eval.suspend(optimizeSafe(Doc.cat(inner, right), depth))
        );
      }
      if (Doc.isCat(self.left) && Doc.isChar(self.left.right)) {
        const left = self.left.left;
        return Eval.suspend(optimizeSafe(Doc.cat(self.left.right, self.right), depth)).flatMap((inner) =>
          Eval.suspend(optimizeSafe(Doc.cat(left, inner), depth))
        );
      }
      if (Doc.isCat(self.left) && Doc.isText(self.left.right)) {
        const left = self.left.left;
        return Eval.suspend(optimizeSafe(Doc.cat(self.left.right, self.right), depth)).flatMap((inner) =>
          Eval.suspend(optimizeSafe(Doc.cat(left, inner), depth))
        );
      }
      return Eval.suspend(optimizeSafe(self.left, depth)).zipWith(
        Eval.suspend(optimizeSafe(self.right, depth)),
        Doc.cat
      );
    }
    case "Nest": {
      if (Doc.isEmpty(self.doc)) {
        return Eval.succeed(self.doc);
      }
      if (Doc.isChar(self.doc)) {
        return Eval.succeed(self.doc);
      }
      if (Doc.isText(self.doc)) {
        return Eval.succeed(self.doc);
      }
      if (Doc.isNest(self.doc)) {
        return Eval.suspend(optimizeSafe(Doc.nest(self.doc.doc, self.indent + self.doc.indent), depth));
      }
      if (self.indent === 0) {
        return Eval.suspend(optimizeSafe(self.doc, depth));
      }
      return Eval.suspend(optimizeSafe(self.doc, depth)).map((doc) => Doc.nest(doc, self.indent));
    }
    case "Union": {
      return Eval.suspend(optimizeSafe(self.left, depth)).zipWith(
        Eval.suspend(optimizeSafe(self.right, depth)),
        Doc.union
      );
    }
    case "Column": {
      return depth._tag === "Shallow"
        ? Eval.succeed(Doc.column(self.react))
        : Eval.succeed(
          Doc.column((position) => optimizeSafe(self.react(position), depth).run())
        );
    }
    case "WithPageWidth": {
      return depth._tag === "Shallow"
        ? Eval.succeed(Doc.withPageWidth(self.react))
        : Eval.succeed(
          Doc.withPageWidth((pageWidth) => optimizeSafe(self.react(pageWidth), depth).run())
        );
    }
    case "Nesting": {
      return depth._tag === "Shallow"
        ? Eval.succeed(Doc.nesting(self.react))
        : Eval.succeed(
          Doc.nesting((level) => optimizeSafe(self.react(level), depth).run())
        );
    }
    case "Annotated": {
      return Eval.suspend(optimizeSafe(self.doc, depth)).map((doc) => Doc.annotate(doc, self.annotation));
    }
    default:
      return Eval.succeed(self);
  }
}
