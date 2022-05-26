import { AnnotationTree, CharTree, ConcatTree, LineTree, TextTree } from "@effect/printer/DocTree"

describe.concurrent("DocTree", () => {
  describe.concurrent("constructors", () => {
    it("char", () => {
      assert.instanceOf(DocStream.char(DocStream.empty, "a").treeForm(), CharTree)
    })

    it("text", () => {
      assert.instanceOf(DocStream.text(DocStream.empty, "foo").treeForm(), TextTree)
    })

    it("line", () => {
      assert.instanceOf(DocStream.line(DocStream.empty, 1).treeForm(), LineTree)
    })

    it("annotated", () => {
      assert.instanceOf(
        DocStream.pushAnnotation(
          DocStream.char(DocStream.popAnnotation(DocStream.empty), "a"),
          undefined
        ).treeForm(),
        AnnotationTree
      )
    })

    it("concat", () => {
      assert.instanceOf(
        DocStream.char(DocStream.char(DocStream.empty, "c"), "a").treeForm(),
        ConcatTree
      )
    })
  })

  describe("parser", () => {
    it("should fail if parsing an empty stream", () => {
      assert.throws(() => {
        DocStream.empty.treeForm()
      })
    })

    it("should fail if attempting to parse a failed stream", () => {
      assert.throws(() => {
        DocStream.failed.treeForm()
      })
    })
  })

  describe("render", () => {
    it("should render an annotated document in tree-form", () => {
      type SimpleHtml = Bold | Italicized | Color | Paragraph | Header

      interface Bold {
        readonly _tag: "Bold"
      }

      interface Color {
        readonly _tag: "Color"
        readonly color: "Red" | "Green" | "Blue"
      }

      interface Italicized {
        readonly _tag: "Italicized"
      }

      interface Paragraph {
        readonly _tag: "Paragraph"
      }

      interface Header {
        readonly _tag: "Header"
        readonly level: number
      }

      function bold(doc: Doc<SimpleHtml>): Doc<SimpleHtml> {
        return doc.annotate({ _tag: "Bold" })
      }

      function color(doc: Doc<SimpleHtml>, color: "Red" | "Green" | "Blue"): Doc<SimpleHtml> {
        return doc.annotate({ _tag: "Color", color })
      }

      function italicized(doc: Doc<SimpleHtml>): Doc<SimpleHtml> {
        return doc.annotate({ _tag: "Italicized" })
      }

      function paragraph(doc: Doc<SimpleHtml>): Doc<SimpleHtml> {
        return doc.annotate({ _tag: "Paragraph" })
      }

      function header(doc: Doc<SimpleHtml>, level: number): Doc<SimpleHtml> {
        return doc.annotate({ _tag: "Header", level })
      }

      function colorToHex(color: "Red" | "Green" | "Blue"): string {
        switch (color) {
          case "Red": {
            return "#f00"
          }
          case "Green": {
            return "#0f0"
          }
          case "Blue": {
            return "#00f"
          }
        }
      }

      function encloseInTag(content: string, html: SimpleHtml): string {
        switch (html._tag) {
          case "Bold": {
            return `<strong>${content}</strong>`
          }
          case "Color": {
            return `<span style="color:${colorToHex(html.color)}">${content}</span>`
          }
          case "Italicized": {
            return `<em>${content}</em>`
          }
          case "Paragraph": {
            return `<p>${content}</p>`
          }
          case "Header": {
            return `<h${html.level}>${content}</h${html.level}>`
          }
        }
      }

      function renderTreeSafe(tree: DocTree<SimpleHtml>): Eval<string> {
        switch (tree._tag) {
          case "EmptyTree": {
            return Eval.succeed("")
          }
          case "CharTree": {
            return Eval.succeed(tree.char)
          }
          case "TextTree": {
            return Eval.succeed(tree.text)
          }
          case "LineTree": {
            return Eval.succeed("\n" + Doc.textSpaces(tree.indentation))
          }
          case "AnnotationTree": {
            return Eval.suspend(renderTreeSafe(tree.tree)).map((content) => encloseInTag(content, tree.annotation))
          }
          case "ConcatTree": {
            if (tree.trees.isEmpty()) {
              return Eval.succeed("")
            }
            const head = tree.trees.unsafeHead()
            const tail = tree.trees.unsafeTail()
            return tail.reduce(
              Eval.suspend(renderTreeSafe(head)),
              (acc, tree) => acc.zipWith(Eval.suspend(renderTreeSafe(tree)), Associative.string.combine)
            )
          }
        }
      }

      function renderTree(tree: DocTree<SimpleHtml>): string {
        return renderTreeSafe(tree).run()
      }

      function render(stream: DocStream<SimpleHtml>): string {
        return renderTree(stream.treeForm())
      }

      const document = Doc.vsep([
        header(Doc.text("Example document"), 1),
        paragraph(
          Doc.hsep([
            Doc.text("This is a"),
            Doc.cat(color(Doc.text("paragraph"), "Red"), Doc.comma)
          ])
        ),
        paragraph(
          Doc.hsep([
            Doc.text("and"),
            Doc.cat(bold(Doc.text("this text is bold!")), Doc.comma)
          ])
        ),
        paragraph(Doc.hsep([Doc.text("and"), italicized(Doc.text("this is italicized!"))]))
      ])

      assert.strictEqual(
        render(document.layoutPretty(LayoutOptions.default)),
        `|<h1>Example document</h1>
         |<p>This is a <span style="color:#f00">paragraph</span>,</p>
         |<p>and <strong>this text is bold!</strong>,</p>
         |<p>and <em>this is italicized!</em></p>`.stripMargin()
      )
    })
  })
})
