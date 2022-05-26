/**
 * The simplest possible tree-based renderer.
 *
 * For example, here is a document annotated with `void` and thee behavior is
 * to surround annotated regions with »>>>« and »<<<«.
 *
 * ```typescript
 * import { identity } from "@effect-ts/core/Function"
 * import * as Identity from "@effect-ts/core/Identity"
 *
 * import * as Doc from "../src/Core/Doc"
 * import * as DocTree from "../src/Core/DocTree"
 * import * as Layout from "../src/Core/Layout"
 *
 * const doc: Doc.Doc<void> = Doc.hsep([
 *   Doc.text("hello"),
 *   Doc.cat_(Doc.annotate_(Doc.text("world"), undefined), Doc.char("!"))
 * ])
 *
 * const tree = DocTree.treeForm(Layout.pretty_(Layout.defaultLayoutOptions, doc))
 *
 * const rendered = DocTree.renderSimplyDecorated_(Identity.string)(
 *   tree,
 *   identity,
 *   (_, x) => `>>>${x}<<<`
 * )
 *
 * console.log(rendered)
 * // => hello >>>world<<<!
 * ```
 *
 * @tsplus fluent ets/printer/DocTree renderSimplyDecorated
 */
export function renderSimplyDecorated_<A, O>(
  self: DocTree<A>,
  I: AssociativeIdentity<O>,
  renderText: (text: string) => O,
  renderAnnotation: (annotation: A, out: O) => O
): O {
  return renderSimplyDecoratedSafe(self, I, renderText, renderAnnotation).run()
}

/**
 * The simplest possible tree-based renderer.
 *
 * For example, here is a document annotated with `void` and thee behavior is
 * to surround annotated regions with »>>>« and »<<<«.
 *
 * ```typescript
 * import { identity } from "@effect-ts/core/Function"
 * import * as Identity from "@effect-ts/core/Identity"
 *
 * import * as Doc from "../src/Core/Doc"
 * import * as DocTree from "../src/Core/DocTree"
 * import * as Layout from "../src/Core/Layout"
 *
 * const doc: Doc.Doc<void> = Doc.hsep([
 *   Doc.text("hello"),
 *   Doc.cat_(Doc.annotate_(Doc.text("world"), undefined), Doc.char("!"))
 * ])
 *
 * const tree = DocTree.treeForm(Layout.pretty_(Layout.defaultLayoutOptions, doc))
 *
 * const rendered = DocTree.renderSimplyDecorated_(Identity.string)(
 *   tree,
 *   identity,
 *   (_, x) => `>>>${x}<<<`
 * )
 *
 * console.log(rendered)
 * // => hello >>>world<<<!
 * ```
 *
 * @tsplus static ets/printer/DocTree/Aspects renderSimplyDecorated
 */
export const renderSimplyDecorated = Pipeable(renderSimplyDecorated_)

function renderSimplyDecoratedSafe<A, O>(
  self: DocTree<A>,
  I: AssociativeIdentity<O>,
  renderText: (text: string) => O,
  renderAnnotation: (annotation: A, out: O) => O
): Eval<O> {
  switch (self._tag) {
    case "EmptyTree": {
      return Eval.succeed(I.identity)
    }
    case "CharTree": {
      return Eval.succeed(renderText(self.char))
    }
    case "TextTree": {
      return Eval.succeed(renderText(self.text))
    }
    case "LineTree": {
      return Eval.succeed(I.combine(renderText("\n"), renderText(Doc.textSpaces(self.indentation))))
    }
    case "AnnotationTree": {
      return Eval.suspend(renderSimplyDecoratedSafe(self.tree, I, renderText, renderAnnotation)).map((out) =>
        renderAnnotation(self.annotation, out)
      )
    }
    case "ConcatTree": {
      if (self.trees.isEmpty()) {
        return Eval.succeed(I.identity)
      }
      const head = self.trees.unsafeHead()
      const tail = self.trees.unsafeTail()
      return tail.reduce(
        Eval.suspend(renderSimplyDecoratedSafe(head, I, renderText, renderAnnotation)),
        (acc, tree) =>
          acc.zipWith(
            Eval.suspend(renderSimplyDecoratedSafe(tree, I, renderText, renderAnnotation)),
            I.combine
          )
      )
    }
  }
}
