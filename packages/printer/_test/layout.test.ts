function fun<A>(doc: Doc<A>): Doc<A> {
  return Doc.cat(
    Doc.hcatT(
      Doc.text("fun("),
      Doc.softLineBreak,
      doc
    ).hang(2),
    Doc.text(")")
  )
}

function funs<A>(doc: Doc<A>): Doc<A> {
  return fun(fun(fun(fun(fun(doc)))))
}

const dashes = Doc.text(Chunk.fill(26 - 2, () => "-").join(""))

const hr = Doc.hcat([Doc.vbar, dashes, Doc.vbar])

const doc = Doc.vsep([
  hr,
  funs(Doc.list(Doc.words("abcdef ghijklm")).align),
  hr
])

const pageWidth: PageWidth = PageWidth.AvailablePerLine(26, 1)

const layoutOptions: LayoutOptions = LayoutOptions(pageWidth)

describe.concurrent("Layout", () => {
  it("unbounded", () => {
    assert.strictEqual(
      doc.layoutUnbounded.render,
      `||------------------------|
       |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
       ||------------------------|`.stripMargin
    )
  })

  it("pretty", () => {
    assert.strictEqual(
      doc.layoutPretty(layoutOptions).render,
      `||------------------------|
       |fun(fun(fun(fun(fun(
       |                  [ abcdef
       |                  , ghijklm ])))))
       ||------------------------|`.stripMargin
    )
  })

  it("smart", () => {
    assert.strictEqual(
      doc.layoutSmart(layoutOptions).render,
      `||------------------------|
       |fun(
       |  fun(
       |    fun(
       |      fun(
       |        fun(
       |          [ abcdef
       |          , ghijklm ])))))
       ||------------------------|`.stripMargin
    )
  })

  it("compact", () => {
    assert.strictEqual(
      doc.layoutCompact.render,
      `||------------------------|
       |fun(
       |fun(
       |fun(
       |fun(
       |fun(
       |[ abcdef
       |, ghijklm ])))))
       ||------------------------|`.stripMargin
    )
  })
})
