describe.concurrent("Doc", () => {
  describe.concurrent("constructors", () => {
    it("empty", () => {
      const doc = Doc.vsep([Doc.text("hello"), Doc.empty.parenthesized(), Doc.text("world")])

      assert.strictEqual(
        doc.renderPrettyDefault(),
        `|hello
         |()
         |world`.stripMargin()
      )
    })

    it("char", () => {
      const doc = Doc.char("a")

      assert.strictEqual(doc.renderPrettyDefault(), "a")
    })

    it("text", () => {
      const doc = Doc.text("foo")

      assert.strictEqual(doc.renderPrettyDefault(), "foo")
    })

    it("string", () => {
      const doc = Doc.string("foo\nbar")

      assert.strictEqual(doc.renderPrettyDefault(), "foobar")
    })

    it("flatAlt", () => {
      const open = Doc.flatAlt(Doc.empty, Doc.text("{ "))
      const close = Doc.flatAlt(Doc.empty, Doc.text(" }"))
      const separator = Doc.flatAlt(Doc.empty, Doc.text("; "))

      function prettyDo<A>(docs: Collection<Doc<A>>): Doc<A> {
        return Doc.hsep([
          Doc.text("do"),
          Doc.encloseSep(docs, open, close, separator).align()
        ]).group()
      }

      const statements = [
        Doc.text("name:_ <- getArgs"),
        Doc.text("let greet = \"Hello, \" <> name\""),
        Doc.text("putStrLn greet")
      ]

      assert.strictEqual(
        prettyDo(statements).renderPretty(80),
        "do { name:_ <- getArgs; let greet = \"Hello, \" <> name\"; putStrLn greet }"
      )

      assert.strictEqual(
        prettyDo(statements).renderPretty(10),
        `|do name:_ <- getArgs
         |   let greet = "Hello, " <> name"
         |   putStrLn greet`.stripMargin()
      )
    })

    it("union", () => {
      const doc = Doc.union(Doc.string("A long string of words"), Doc.char("b"))

      assert.strictEqual(doc.renderPrettyDefault(), "A long string of words")
      assert.strictEqual(doc.renderPretty(1), "b")
    })

    it("cat", () => {
      const doc = Doc.cat(Doc.char("a"), Doc.char("b"))

      assert.strictEqual(doc.renderPrettyDefault(), "ab")
    })

    it("line", () => {
      const doc = Doc.hcat([
        Doc.text("lorem ipsum"),
        Doc.line,
        Doc.text("dolor sit amet")
      ])

      assert.strictEqual(
        doc.renderPrettyDefault(),
        `|lorem ipsum
         |dolor sit amet`.stripMargin()
      )
      assert.strictEqual(
        doc.group().renderPrettyDefault(),
        "lorem ipsum dolor sit amet"
      )
    })

    it("lineBreak", () => {
      const doc = Doc.hcat([
        Doc.text("lorem ipsum"),
        Doc.lineBreak,
        Doc.text("dolor sit amet")
      ])

      assert.strictEqual(
        doc.renderPrettyDefault(),
        `|lorem ipsum
         |dolor sit amet`.stripMargin()
      )
      assert.strictEqual(
        doc.group().renderPrettyDefault(),
        "lorem ipsumdolor sit amet"
      )
    })

    it("softLine", () => {
      const doc = Doc.hcat([
        Doc.text("lorem ipsum"),
        Doc.softLine,
        Doc.text("dolor sit amet")
      ])

      assert.strictEqual(doc.renderPretty(80), "lorem ipsum dolor sit amet")
      assert.strictEqual(
        doc.renderPretty(10),
        `|lorem ipsum
         |dolor sit amet`.stripMargin()
      )
    })

    it("softLineBreak", () => {
      const doc = Doc.hcat([
        Doc.text("ThisText"),
        Doc.softLineBreak,
        Doc.text("IsWayTooLong")
      ])

      assert.strictEqual(doc.renderPretty(80), "ThisTextIsWayTooLong")
      assert.strictEqual(
        doc.renderPretty(10),
        `|ThisText
         |IsWayTooLong`.stripMargin()
      )
    })

    it("hardLine", () => {
      const doc = Doc.hcat([
        Doc.text("lorem ipsum"),
        Doc.hardLine,
        Doc.text("dolor sit amet")
      ])

      assert.strictEqual(
        doc.renderPretty(1000),
        `|lorem ipsum
         |dolor sit amet`.stripMargin()
      )
    })

    it("nest", () => {
      const doc = Doc.vsep([
        Doc.nest(Doc.vsep(Doc.words("lorem ipsum dolor")), 4),
        Doc.text("sit"),
        Doc.text("amet")
      ])

      assert.strictEqual(
        doc.renderPrettyDefault(),
        `|lorem
         |    ipsum
         |    dolor
         |sit
         |amet`.stripMargin()
      )
    })

    it("column", () => {
      const prefix = Doc.hsep([
        Doc.text("prefix"),
        Doc.column((l) => Doc.text(`| <- column ${l}`))
      ])
      const doc = Doc.vsep(Chunk(0, 4, 8).map((n) => prefix.indent(n)))

      assert.strictEqual(
        doc.renderPrettyDefault(),
        `|prefix | <- column 7
         |    prefix | <- column 11
         |        prefix | <- column 15`.stripMargin()
      )
    })

    it("nesting", () => {
      const prefix = Doc.hsep([
        Doc.text("prefix"),
        Doc.nesting((l) => Doc.text(`Nested: ${l}`).bracketed())
      ])
      const doc = Doc.vsep(Chunk(0, 4, 8).map((n) => prefix.indent(n)))

      assert.strictEqual(
        doc.renderPrettyDefault(),
        `|prefix [Nested: 0]
         |    prefix [Nested: 4]
         |        prefix [Nested: 8]`.stripMargin()
      )
    })

    it("withPageWidth", () => {
      const prefix = Doc.hsep([
        Doc.text("prefix"),
        Doc.withPageWidth(
          Match.$.tag({
            AvailablePerLine: ({ lineWidth, ribbonFraction }) =>
              Doc.text(`Width: ${lineWidth}, Ribbon Fraction: ${ribbonFraction}`).bracketed(),
            Unbounded: () => Doc.empty
          })
        )
      ])
      const doc = Doc.vsep(Chunk(0, 4, 8).map((n) => prefix.indent(n)))

      assert.strictEqual(
        doc.renderPretty(32),
        `|prefix [Width: 32, Ribbon Fraction: 1]
         |    prefix [Width: 32, Ribbon Fraction: 1]
         |        prefix [Width: 32, Ribbon Fraction: 1]`.stripMargin()
      )
    })

    describe.concurrent("guards", () => {
      it("isFail", () => {
        assert.isTrue(Doc.isFail(Doc.fail))
        assert.isFalse(Doc.isFail(Doc.char("a")))
      })

      it("isEmpty", () => {
        assert.isTrue(Doc.isEmpty(Doc.empty))
        assert.isFalse(Doc.isEmpty(Doc.char("a")))
      })

      it("isChar", () => {
        assert.isTrue(Doc.isChar(Doc.char("a")))
        assert.isFalse(Doc.isChar(Doc.text("foo")))
      })

      it("isText", () => {
        assert.isTrue(Doc.isText(Doc.text("foo")))
        assert.isFalse(Doc.isText(Doc.char("a")))
      })

      it("isLine", () => {
        assert.isTrue(Doc.isLine(Doc.hardLine))
        assert.isFalse(Doc.isLine(Doc.char("a")))
      })

      it("isFlatAlt", () => {
        assert.isTrue(Doc.isFlatAlt(Doc.flatAlt(Doc.char("a"), Doc.char("b"))))
        assert.isFalse(Doc.isFlatAlt(Doc.char("a")))
      })

      it("isCat", () => {
        assert.isTrue(Doc.isCat(Doc.cat(Doc.char("a"), Doc.char("b"))))
        assert.isFalse(Doc.isCat(Doc.char("a")))
      })

      it("isNest", () => {
        assert.isTrue(Doc.isNest(Doc.nest(Doc.char("a"), 4)))
        assert.isFalse(Doc.isNest(Doc.char("a")))
      })

      it("isUnion", () => {
        assert.isTrue(Doc.isUnion(Doc.union(Doc.char("a"), Doc.char("b"))))
        assert.isFalse(Doc.isUnion(Doc.char("a")))
      })

      it("isColumn", () => {
        assert.isTrue(Doc.isColumn(Doc.column(() => Doc.char("a"))))
        assert.isFalse(Doc.isColumn(Doc.char("a")))
      })

      it("isWithPageWidth", () => {
        assert.isTrue(Doc.isWithPageWidth(Doc.withPageWidth(() => Doc.char("a"))))
        assert.isFalse(Doc.isWithPageWidth(Doc.char("a")))
      })

      it("isNesting", () => {
        assert.isTrue(Doc.isNesting(Doc.nesting(() => Doc.char("a"))))
        assert.isFalse(Doc.isNesting(Doc.char("a")))
      })

      it("isAnnotated", () => {
        assert.isTrue(Doc.isAnnotated(Doc.annotate(Doc.char("a"), 1)))
        assert.isFalse(Doc.isAnnotated(Doc.char("a")))
      })
    })

    describe.concurrent("concatenation combinators", () => {
      it("concatWith", () => {
        const doc = Doc.concatWith([Doc.char("a"), Doc.char("b")], Doc.appendWithSpace)

        assert.strictEqual(doc.renderPrettyDefault(), "a b")
      })

      it("appendWithSpace", () => {
        const doc = Doc.appendWithSpace(Doc.char("a"), Doc.char("b"))

        assert.strictEqual(doc.renderPrettyDefault(), "a b")
      })

      it("appendWithLine", () => {
        const doc = Doc.appendWithLine(Doc.char("a"), Doc.char("b"))

        assert.strictEqual(doc.renderPrettyDefault(), "a\nb")
      })

      it("appendWithLineBreak", () => {
        const doc = Doc.appendWithLineBreak(Doc.char("a"), Doc.char("b"))

        assert.strictEqual(doc.renderPrettyDefault(), "a\nb")
        assert.strictEqual(doc.group().renderPrettyDefault(), "ab")
      })

      it("appendWithSoftLine", () => {
        const doc = Doc.appendWithSoftLine(Doc.char("a"), Doc.char("b"))

        assert.strictEqual(doc.renderPrettyDefault(), "a b")
        assert.strictEqual(doc.renderPretty(1), "a\nb")
      })

      it("appendWithSoftLineBreak", () => {
        const doc = Doc.appendWithSoftLineBreak(Doc.char("a"), Doc.char("b"))

        assert.strictEqual(doc.renderPrettyDefault(), "ab")
        assert.strictEqual(doc.renderPretty(1), "a\nb")
      })
    })

    describe.concurrent("alternative combinators", () => {
      describe.concurrent("group", () => {
        it("should ensure that the `left` document is less wide than the `right`", () => {
          const doc = Doc.flatAlt(Doc.text("even wider"), Doc.text("too wide")).group()

          // If the `right` document does not fit the page, the algorithm falls
          // back to an even wider layout
          assert.strictEqual(doc.renderPretty(7), "even wider")
        })

        it("should flatten the right document", () => {
          const doc = Doc.flatAlt(Doc.char("x"), Doc.hcat([Doc.char("y"), Doc.line, Doc.char("y")])).group()

          assert.strictEqual(doc.renderPrettyDefault(), "y y")
        })

        it("should never render an unflattenable `right` document", () => {
          const doc = Doc.flatAlt(Doc.char("x"), Doc.hcat([Doc.char("y"), Doc.hardLine, Doc.char("y")])).group()

          assert.strictEqual(doc.renderPrettyDefault(), "x")
        })
      })
    })

    describe.concurrent("sep combinators", () => {
      it("hsep", () => {
        const doc = Doc.hsep(Doc.words("lorem ipsum dolor sit amet"))

        assert.strictEqual(doc.renderPrettyDefault(), "lorem ipsum dolor sit amet")
        assert.strictEqual(doc.renderPretty(5), "lorem ipsum dolor sit amet")
      })

      it("vsep", () => {
        const doc = Doc.hsep([Doc.text("prefix"), Doc.vsep(Doc.words("text to lay out"))])

        assert.strictEqual(
          doc.renderPrettyDefault(),
          `|prefix text
           |to
           |lay
           |out`.stripMargin()
        )
      })

      it("fillSep", () => {
        const doc = Doc.fillSep(Doc.words("lorem ipsum dolor sit amet"))

        assert.strictEqual(doc.renderPrettyDefault(), "lorem ipsum dolor sit amet")
        assert.strictEqual(
          doc.renderPretty(10),
          `|lorem
           |ipsum
           |dolor sit
           |amet`.stripMargin()
        )
      })

      it("sep", () => {
        const doc = Doc.hsep([Doc.text("prefix"), Doc.seps(Doc.words("text to lay out"))])

        assert.strictEqual(doc.renderPrettyDefault(), "prefix text to lay out")
        assert.strictEqual(
          doc.renderPretty(20),
          `|prefix text
           |to
           |lay
           |out`.stripMargin()
        )
      })
    })

    describe.concurrent("cat combinators", () => {
      it("hcat", () => {
        const doc = Doc.hcat(Doc.words("lorem ipsum dolor sit amet"))

        assert.strictEqual(doc.renderPrettyDefault(), "loremipsumdolorsitamet")
      })

      it("vcat", () => {
        const doc = Doc.vcat(Doc.words("lorem ipsum dolor sit amet"))

        assert.strictEqual(
          doc.renderPrettyDefault(),
          `|lorem
           |ipsum
           |dolor
           |sit
           |amet`.stripMargin()
        )
      })

      it("fillCat", () => {
        const doc = Doc.fillCat(Doc.words("lorem ipsum dolor sit amet"))

        assert.strictEqual(doc.renderPrettyDefault(), "loremipsumdolorsitamet")
        assert.strictEqual(
          doc.renderPretty(10),
          `|loremipsum
           |dolorsit
           |amet`.stripMargin()
        )
      })

      it("cats", () => {
        const doc = Doc.hsep([Doc.text("Docs:"), Doc.cats(Doc.words("lorem ipsum dolor"))])

        assert.strictEqual(doc.renderPrettyDefault(), "Docs: loremipsumdolor")
        assert.strictEqual(
          doc.renderPretty(10),
          `|Docs: lorem
           |ipsum
           |dolor`.stripMargin()
        )
      })
    })

    describe.concurrent("filler combinators", () => {
      it("fill", () => {
        type Signature = Tuple<[name: string, type: string]>

        const signatures: Chunk<Signature> = Chunk(
          Tuple("empty", "Doc"),
          Tuple("nest", "Int -> Doc -> Doc"),
          Tuple("fillSep", "[Doc] -> Doc")
        )

        function prettySignature<A>({ tuple: [name, type] }: Signature): Doc<A> {
          return Doc.hsep([Doc.text(name).fill(5), Doc.text("::"), Doc.text(type)])
        }

        const doc = Doc.hsep([
          Doc.text("let"),
          Doc.vcat(signatures.map(prettySignature)).align()
        ])

        assert.strictEqual(
          doc.renderPrettyDefault(),
          `|let empty :: Doc
           |    nest  :: Int -> Doc -> Doc
           |    fillSep :: [Doc] -> Doc`.stripMargin()
        )
      })

      it("fillBreak", () => {
        type Signature = Tuple<[name: string, type: string]>

        const signatures: Chunk<Signature> = Chunk(
          Tuple("empty", "Doc"),
          Tuple("nest", "Int -> Doc -> Doc"),
          Tuple("fillSep", "[Doc] -> Doc")
        )

        function prettySignature<A>({ tuple: [name, type] }: Signature): Doc<A> {
          return Doc.hsep([Doc.text(name).fillBreak(5), Doc.text("::"), Doc.text(type)])
        }

        const doc = Doc.hsep([
          Doc.text("let"),
          Doc.vcat(signatures.map(prettySignature)).align()
        ])

        assert.strictEqual(
          doc.renderPrettyDefault(),
          `|let empty :: Doc
           |    nest  :: Int -> Doc -> Doc
           |    fillSep
           |          :: [Doc] -> Doc`.stripMargin()
        )
      })
    })

    describe.concurrent("alignment combinators", () => {
      it("align", () => {
        const doc = Doc.hsep([
          Doc.text("lorem"),
          Doc.vsep([Doc.text("ipsum"), Doc.text("dolor")]).align()
        ])

        assert.strictEqual(
          doc.renderPrettyDefault(),
          `|lorem ipsum
           |      dolor`.stripMargin()
        )
      })

      it("hang", () => {
        const doc = Doc.hsep([
          Doc.text("prefix"),
          Doc.reflow("Indenting these words with hang").hang(4)
        ])

        assert.strictEqual(
          doc.renderPretty(24),
          `|prefix Indenting these
           |           words with
           |           hang`.stripMargin()
        )
      })

      it("indent", () => {
        const doc = Doc.hcat([
          Doc.text("prefix"),
          Doc.reflow("The indent function indents these words!").indent(4)
        ])

        assert.strictEqual(
          doc.renderPretty(24),
          `|prefix    The indent
           |          function
           |          indents these
           |          words!`.stripMargin()
        )
      })

      it("encloseSep", () => {
        const doc = Doc.hsep([
          Doc.text("list"),
          Doc.encloseSep(
            Chunk("1", "20", "300", "4000").map((n) => n.length === 1 ? Doc.char(n) : Doc.text(n)),
            Doc.lbracket,
            Doc.rbracket,
            Doc.comma
          ).align()
        ])

        assert.strictEqual(doc.renderPrettyDefault(), "list [1,20,300,4000]")
        assert.strictEqual(
          doc.renderPretty(10),
          `|list [1
           |     ,20
           |     ,300
           |     ,4000]`.stripMargin()
        )
      })

      it("list", () => {
        const doc = Doc.list(
          Chunk("1", "20", "300", "4000").map((n) => n.length === 1 ? Doc.char(n) : Doc.text(n))
        )

        assert.strictEqual(doc.renderPrettyDefault(), "[1, 20, 300, 4000]")
      })

      it("tupled", () => {
        const doc = Doc.tupled(
          Chunk("1", "20", "300", "4000").map((n) => n.length === 1 ? Doc.char(n) : Doc.text(n))
        )

        assert.strictEqual(doc.renderPrettyDefault(), "(1, 20, 300, 4000)")
      })
    })

    describe.concurrent("reactive/conditional combinators", () => {
      it("width", () => {
        function annotate<A>(self: Doc<A>): Doc<A> {
          return self.bracketed().width((w) => Doc.text(` <- width: ${w}`))
        }

        const docs = Chunk(
          Doc.text("---"),
          Doc.text("------"),
          Doc.text("---").indent(3),
          Doc.vsep([Doc.text("---"), Doc.text("---").indent(4)])
        )

        const doc = Doc.vsep(docs.map(annotate)).align()

        assert.strictEqual(
          doc.renderPrettyDefault(),
          `|[---] <- width: 5
           |[------] <- width: 8
           |[   ---] <- width: 8
           |[---
           |    ---] <- width: 8`.stripMargin()
        )
      })
    })

    describe.concurrent("general combinators", () => {
      it("punctuate", () => {
        const docs = Doc.punctuate(Doc.words("lorem ipsum dolor sit amet"), Doc.comma)

        assert.strictEqual(Doc.hsep(docs).renderPrettyDefault(), "lorem, ipsum, dolor, sit, amet")

        // The separators are put at the end of the entries, which can be better
        // visualzied if the documents are rendered vertically
        assert.strictEqual(
          Doc.vsep(docs).renderPrettyDefault(),
          `|lorem,
           |ipsum,
           |dolor,
           |sit,
           |amet`.stripMargin()
        )
      })

      it("surround", () => {
        const doc = Doc.concatWith(
          Doc.words("@effect-ts printer Core Doc"),
          (x, y) => Doc.slash.surround(x, y)
        )

        assert.strictEqual(doc.renderPrettyDefault(), "@effect-ts/printer/Core/Doc")
      })

      it("parenthesized", () => {
        const doc = Doc.char("a").parenthesized()

        assert.strictEqual(doc.renderPrettyDefault(), "(a)")
      })

      it("angled", () => {
        const doc = Doc.char("a").angled()

        assert.strictEqual(doc.renderPrettyDefault(), "<a>")
      })

      it("bracketed", () => {
        const doc = Doc.char("a").bracketed()

        assert.strictEqual(doc.renderPrettyDefault(), "[a]")
      })

      it("braced", () => {
        const doc = Doc.char("a").braced()

        assert.strictEqual(doc.renderPrettyDefault(), "{a}")
      })

      it("singleQuoted", () => {
        const doc = Doc.char("a").singleQuoted()

        assert.strictEqual(doc.renderPrettyDefault(), "'a'")
      })

      it("doubleQuoted", () => {
        const doc = Doc.char("a").doubleQuoted()

        assert.strictEqual(doc.renderPrettyDefault(), "\"a\"")
      })

      it("spaces", () => {
        const doc = Doc.spaces(5).doubleQuoted().bracketed()

        assert.strictEqual(doc.renderPrettyDefault(), "[\"     \"]")
      })

      it("words", () => {
        const doc = Doc.tupled(Doc.words("lorem ipsum dolor"))

        assert.strictEqual(doc.renderPrettyDefault(), "(lorem, ipsum, dolor)")
      })

      it("reflow", () => {
        const doc = Doc.reflow(
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        )

        assert.strictEqual(
          doc.renderPretty(32),
          `|Lorem ipsum dolor sit amet,
           |consectetur adipisicing elit,
           |sed do eiusmod tempor incididunt
           |ut labore et dolore magna
           |aliqua.`.stripMargin()
        )
      })
    })

    describe.concurrent("instances", () => {
      it("Associative", () => {
        const A = Doc.getAssociative<never>()
        const doc = A.combine(Doc.text("hello"), Doc.text("world"))

        assert.strictEqual(doc.renderPrettyDefault(), "helloworld")
      })

      it("AssociativeIdentity", () => {
        const I = Doc.getAssociativeIdentity<never>()
        const doc = I.combine(
          Doc.text("hello"),
          I.combine(I.identity.parenthesized(), Doc.text("world"))
        )

        assert.strictEqual(doc.renderPrettyDefault(), "hello()world")
      })
    })

    describe.concurrent("utils", () => {
      it("textSpaces", () => {
        assert.strictEqual(Doc.textSpaces(4), "    ")
      })
    })
  })
})
