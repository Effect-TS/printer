function fun<A>(doc: Doc<A>): Doc<A> {
  return Doc.cat(
    Doc.hcat([Doc.text("fun("), Doc.softLineBreak, doc]).hang(2),
    Doc.text(")")
  )
}

function funs<A>(doc: Doc<A>): Doc<A> {
  return fun(fun(fun(fun(fun(doc)))))
}

const dashes = Doc.text(Chunk.fill(26 - 2, () => "-").join(""))

const hr = Doc.hcat([Doc.vbar, dashes, Doc.vbar])

const doc = Doc.vsep([hr, funs(Doc.list(Doc.words("abcdef ghijklm")).align), hr])

describe.concurrent("Render", () => {
  it("renderPretty", () => {
    assert.strictEqual(
      doc.renderPretty(14, 1),
      `||------------------------|
       |fun(fun(fun(
       |          fun(
       |            fun(
       |              [ abcdef
       |              , ghijklm ])))))
       ||------------------------|`.stripMargin
    )
  })

  it("renderPrettyDefault", () => {
    assert.strictEqual(
      doc.renderPrettyDefault,
      `||------------------------|
       |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
       ||------------------------|`.stripMargin
    )
  })

  it("renderPrettyUnbounded", () => {
    assert.strictEqual(
      doc.renderPrettyUnbounded,
      `||------------------------|
       |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
       ||------------------------|`.stripMargin
    )
  })

  it("renderSmart", () => {
    assert.strictEqual(
      doc.renderSmart(14, 1),
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

  it("renderSmartDefault", () => {
    assert.strictEqual(
      doc.renderSmartDefault,
      `||------------------------|
       |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
       ||------------------------|`.stripMargin
    )
  })

  it("renderSmartUnbounded", () => {
    assert.strictEqual(
      doc.renderSmartDefault,
      `||------------------------|
       |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
       ||------------------------|`.stripMargin
    )
  })

  it("renderCompact", () => {
    assert.strictEqual(
      doc.renderCompact,
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
