/**
 * The `group` combinator attempts to lay out a document onto a single line by
 * removing the contained line breaks. If the result does not fit the page, or
 * if a `hardLine` prevents flattening the document, `x` is laid out without
 * any changes.
 *
 * The `group` function is key to layouts that adapt to available space nicely.
 *
 * @tsplus fluent ets/printer/Doc group
 */
export function group<A>(self: Doc<A>): Doc<A> {
  switch (self._tag) {
    case "FlatAlt": {
      const flattened = self.right.changesUponFlattening();
      switch (flattened._tag) {
        case "Flattened": {
          return Doc.union(flattened.value, self.left);
        }
        case "AlreadyFlat": {
          return Doc.union(self.right, self.left);
        }
        case "NeverFlat": {
          return self.left;
        }
      }
    }
    case "Union": {
      return self;
    }
    default: {
      return groupInternal(self);
    }
  }
}

function groupInternal<A>(self: Doc<A>): Doc<A> {
  const flattened = self.changesUponFlattening();
  switch (flattened._tag) {
    case "Flattened": {
      return Doc.union(flattened.value, self);
    }
    default: {
      return self;
    }
  }
}
