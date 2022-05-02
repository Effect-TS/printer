/**
 * Decides whether a `DocStream` fits the given constraints, namely:
 * - original indentation of the current
 * - current column
 * - initial indentation of the alternative `DocStream` if it starts with
 *   a line break (used by `layoutSmart`)
 * - width in which to fit the first line
 */
export interface FittingPredicate<A> {
  (
    lineIndent: number,
    currentColumn: number,
    initialIndentY: Option<number>
  ): Predicate<DocStream<A>>;
}

/**
 * @tsplus fluent ets/printer/Doc layoutWadlerLeijen
 */
export function layoutWadlerLeijen_<A>(
  self: Doc<A>,
  fits: FittingPredicate<A>,
  options: LayoutOptions
): DocStream<A> {
  return layoutWadlerLeijenSafe(0, 0, LayoutPipeline.cons(0, self, LayoutPipeline.nil), fits, options).run();
}

/**
 * @tsplus static ets/printer/Doc/Aspects layoutWadlerLeijen
 */
export const layoutWadlerLeijen = Pipeable(layoutWadlerLeijen_);

function layoutWadlerLeijenSafe<A>(
  nl: number,
  cc: number,
  x: LayoutPipeline<A>,
  fits: FittingPredicate<A>,
  options: LayoutOptions
): Eval<DocStream<A>> {
  switch (x._tag) {
    case "Nil": {
      return Eval.succeed(DocStream.empty);
    }
    case "Cons": {
      switch (x.document._tag) {
        case "Fail": {
          return Eval.succeed(DocStream.failed);
        }
        case "Empty": {
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, x.pipeline, fits, options));
        }
        case "Char": {
          const char = x.document.char;
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc + 1, x.pipeline, fits, options)).map((stream) =>
            DocStream.char(stream, char)
          );
        }
        case "Text": {
          const text = x.document.text;
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc + text.length, x.pipeline, fits, options)).map((stream) =>
            DocStream.text(stream, text)
          );
        }
        case "Line": {
          return Eval.suspend(layoutWadlerLeijenSafe(x.indent, x.indent, x.pipeline, fits, options)).map((stream) =>
            DocStream.line(stream, DocStream.isEmptyStream(stream) || DocStream.isLineStream(stream) ? 0 : x.indent)
          );
        }
        case "FlatAlt": {
          const pipeline = LayoutPipeline.cons(x.indent, x.document.left, x.pipeline);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, pipeline, fits, options));
        }
        case "Cat": {
          const inner = LayoutPipeline.cons(x.indent, x.document.right, x.pipeline);
          const outer = LayoutPipeline.cons(x.indent, x.document.left, inner);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, outer, fits, options));
        }
        case "Nest": {
          const indent = x.indent + x.document.indent;
          const pipeline = LayoutPipeline.cons(indent, x.document.doc, x.pipeline);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, pipeline, fits, options));
        }
        case "Union": {
          const leftPipeline = LayoutPipeline.cons(x.indent, x.document.left, x.pipeline);
          const rightPipeline = LayoutPipeline.cons(x.indent, x.document.right, x.pipeline);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, leftPipeline, fits, options)).zipWith(
            layoutWadlerLeijenSafe(nl, cc, rightPipeline, fits, options),
            (left, right) => selectNicer(fits, nl, cc, left, right)
          );
        }
        case "Column": {
          const pipeline = LayoutPipeline.cons(x.indent, x.document.react(cc), x.pipeline);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, pipeline, fits, options));
        }
        case "WithPageWidth": {
          const pipeline = LayoutPipeline.cons(x.indent, x.document.react(options.pageWidth), x.pipeline);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, pipeline, fits, options));
        }
        case "Nesting": {
          const pipeline = LayoutPipeline.cons(x.indent, x.document.react(x.indent), x.pipeline);
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, pipeline, fits, options));
        }
        case "Annotated": {
          const annotation = x.document.annotation;
          const pipeline = LayoutPipeline.cons(x.indent, x.document.doc, LayoutPipeline.undoAnnotation(x.pipeline));
          return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, pipeline, fits, options)).map((stream) =>
            DocStream.pushAnnotation(stream, annotation)
          );
        }
      }
    }
    case "UndoAnnotation":
      return Eval.suspend(layoutWadlerLeijenSafe(nl, cc, x.pipeline, fits, options)).map((stream) =>
        DocStream.popAnnotation(stream)
      );
  }
}

/**
 * @tsplus tailRec
 */
function initialIndentation<A>(self: DocStream<A>): Option<number> {
  switch (self._tag) {
    case "LineStream":
      return Option.some(self.indentation);
    case "PushAnnotationStream":
      return initialIndentation(self.stream);
    case "PopAnnotationStream":
      return initialIndentation(self.stream);
    default:
      return Option.none;
  }
}

function selectNicer<A>(
  fits: FittingPredicate<A>,
  lineIndent: number,
  currentColumn: number,
  x: DocStream<A>,
  y: DocStream<A>
): DocStream<A> {
  const fitsLayout = fits(lineIndent, currentColumn, initialIndentation(y))(x);
  return fitsLayout ? x : y;
}
