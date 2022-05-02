/**
 * @tsplus fluent ets/printer/Doc fold
 */
export function fold_<A, R>(
  self: Doc<A>,
  patterns: {
    readonly Fail: () => R;
    readonly Empty: () => R;
    readonly Char: (char: string) => R;
    readonly Text: (text: string) => R;
    readonly Line: () => R;
    readonly FlatAlt: (x: Doc<A>, y: Doc<A>) => R;
    readonly Cat: (x: Doc<A>, y: Doc<A>) => R;
    readonly Nest: (indent: number, doc: Doc<A>) => R;
    readonly Union: (x: Doc<A>, y: Doc<A>) => R;
    readonly Column: (react: (position: number) => Doc<A>) => R;
    readonly WithPageWidth: (react: (pageWidth: PageWidth) => Doc<A>) => R;
    readonly Nesting: (react: (level: number) => Doc<A>) => R;
    readonly Annotated: (annotation: A, doc: Doc<A>) => R;
  }
): R {
  switch (self._tag) {
    case "Fail":
      return patterns.Fail();
    case "Empty":
      return patterns.Empty();
    case "Char":
      return patterns.Char(self.char);
    case "Text":
      return patterns.Text(self.text);
    case "Line":
      return patterns.Line();
    case "FlatAlt":
      return patterns.FlatAlt(self.left, self.right);
    case "Cat":
      return patterns.Cat(self.left, self.right);
    case "Nest":
      return patterns.Nest(self.indent, self.doc);
    case "Union":
      return patterns.Union(self.left, self.right);
    case "Column":
      return patterns.Column(self.react);
    case "WithPageWidth":
      return patterns.WithPageWidth(self.react);
    case "Nesting":
      return patterns.Nesting(self.react);
    case "Annotated":
      return patterns.Annotated(self.annotation, self.doc);
  }
}

/**
 * @tsplus static ets/printer/Doc/Aspects fold
 */
export const fold = Pipeable(fold_);
