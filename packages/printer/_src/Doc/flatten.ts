/**
 * Flattens a document but does not report changes.
 *
 * @tsplus fluent ets/printer/Doc flatten
 */
export function flatten<A>(self: Doc<A>): Doc<A> {
  return flattenSafe(self).run()
}

function flattenSafe<A>(self: Doc<A>): Eval<Doc<A>> {
  switch (self._tag) {
    case "Line":
      return Eval.succeed(Doc.fail)
    case "Cat":
      return Eval.suspend(flattenSafe(self.left)).zipWith(Eval.suspend(flattenSafe(self.right)), Doc.cat)
    case "FlatAlt":
      return Eval.suspend(flattenSafe(self.right))
    case "Union":
      return Eval.suspend(flattenSafe(self.left))
    case "Nest":
      return Eval.suspend(flattenSafe(self.doc)).map((doc) => Doc.nest(doc, self.indent))
    case "Column":
      return Eval.succeed(Doc.column((position) => flattenSafe(self.react(position)).run()))
    case "WithPageWidth":
      return Eval.succeed(Doc.withPageWidth((pageWidth) => flattenSafe(self.react(pageWidth)).run()))
    case "Nesting":
      return Eval.succeed(Doc.nesting((level) => flattenSafe(self.react(level)).run()))
    case "Annotated":
      return Eval.suspend(flattenSafe(self.doc)).map((doc) => Doc.annotate(doc, self.annotation))
    default:
      return Eval.succeed(self)
  }
}
