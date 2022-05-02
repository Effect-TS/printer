/**
 * Select the first element of each `Union` and discard the first element of
 * each `FlatAlt` to produce a "flattened" version of the input document.
 *
 * The result is `Flattened` if the element might change depending on the chosen
 * layout algorithm (i.e., the resulting document contains sub-documents that
 * may be rendered differently).
 *
 * The result is `AlreadyFlat` if the document is static (i.e., the resulting
 * document contains only a plain `Empty` node).
 *
 * `NeverFlat` is returned when the document cannot be flattened because it
 * contains either a hard `Line` or a `Fail`.
 *
 * @tsplus fluent ets/printer/Doc changesUponFlattening
 */
export function changesUponFlattening<A>(self: Doc<A>): Flatten<Doc<A>> {
  return changesUponFlatteningSafe(self).run();
}

function changesUponFlatteningSafe<A>(self: Doc<A>): Eval<Flatten<Doc<A>>> {
  switch (self._tag) {
    case "Fail":
      return Eval.succeed(Flatten.NeverFlat);
    case "Line":
      return Eval.succeed(Flatten.NeverFlat);
    case "FlatAlt":
      return Eval.succeed(Flatten.Flattened(self.right.flatten()));
    case "Cat": {
      return Eval.suspend(changesUponFlatteningSafe(self.left)).zipWith(
        Eval.suspend(changesUponFlatteningSafe(self.right)),
        (left, right) => {
          if (Flatten.isNeverFlat(left) || Flatten.isNeverFlat(right)) {
            return Flatten.NeverFlat;
          }
          if (Flatten.isFlattened(left) && Flatten.isFlattened(right)) {
            return Flatten.Flattened(Doc.cat(left.value, right.value));
          }
          if (Flatten.isFlattened(left) && Flatten.isAlreadyFlat(right)) {
            return Flatten.Flattened(Doc.cat(left.value, self.right));
          }
          if (Flatten.isAlreadyFlat(left) && Flatten.isFlattened(right)) {
            return Flatten.Flattened(Doc.cat(self.left, right.value));
          }
          if (Flatten.isAlreadyFlat(left) && Flatten.isAlreadyFlat(right)) {
            return Flatten.AlreadyFlat;
          }

          throw new Error("bug, it seems we didn't manage a branch");
        }
      );
    }
    case "Nest": {
      return Eval.suspend(changesUponFlatteningSafe(self.doc)).map(
        Flatten.$.map((flattened) => Doc.nest(flattened, self.indent))
      );
    }
    case "Union":
      return Eval.succeed(Flatten.Flattened(self.left));
    case "Column":
      return Eval.succeed(Flatten.Flattened(Doc.column((position) => self.react(position).flatten())));
    case "WithPageWidth":
      return Eval.succeed(Flatten.Flattened(Doc.withPageWidth((pageWidth) => self.react(pageWidth).flatten())));
    case "Nesting":
      return Eval.succeed(Flatten.Flattened(Doc.nesting((level) => self.react(level).flatten())));
    case "Annotated": {
      return Eval.suspend(changesUponFlatteningSafe(self.doc)).map(
        Flatten.$.map((flattened) => Doc.annotate(flattened, self.annotation))
      );
    }
    default: {
      return Eval.succeed(Flatten.AlreadyFlat);
    }
  }
}
