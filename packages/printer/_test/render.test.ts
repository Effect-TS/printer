import * as String from "@fp-ts/data/String"

function fun<A>(doc: Doc<A>): Doc<A> {
  return Doc
    .hcat([Doc.text("fun("), Doc.softLineBreak, doc])
    .hang(2)
    .cat(Doc.text(")"))
}

function funs<A>(doc: Doc<A>): Doc<A> {
  return fun(fun(fun(fun(fun(doc)))))
}

const dashes = Doc.text(Array.from({ length: 26 - 2 }, () => "-").join(""))

const hr = Doc.hcat([Doc.vbar, dashes, Doc.vbar])

const doc = Doc.vsep([hr, funs(Doc.list(Doc.words("abcdef ghijklm")).align), hr])

describe.concurrent("Render", () => {
  it("renderPretty", () => {
    assert.strictEqual(
      doc.renderPretty(14, 1),
      String.stripMargin(
        `||------------------------|
          |fun(fun(fun(
          |          fun(
          |            fun(
          |              [ abcdef
          |              , ghijklm ])))))
          ||------------------------|`
      )
    )
  })

  it("renderPrettyDefault", () => {
    assert.strictEqual(
      doc.renderPrettyDefault,
      String.stripMargin(
        `||------------------------|
         |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
         ||------------------------|`
      )
    )
  })

  it("renderPrettyUnbounded", () => {
    assert.strictEqual(
      doc.renderPrettyUnbounded,
      String.stripMargin(
        `||------------------------|
         |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
         ||------------------------|`
      )
    )
  })

  it("renderSmart", () => {
    assert.strictEqual(
      doc.renderSmart(14, 1),
      String.stripMargin(
        `||------------------------|
         |fun(
         |  fun(
         |    fun(
         |      fun(
         |        fun(
         |          [ abcdef
         |          , ghijklm ])))))
         ||------------------------|`
      )
    )
  })

  it("renderSmartDefault", () => {
    assert.strictEqual(
      doc.renderSmartDefault,
      String.stripMargin(
        `||------------------------|
         |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
         ||------------------------|`
      )
    )
  })

  it("renderSmartUnbounded", () => {
    assert.strictEqual(
      doc.renderSmartDefault,
      String.stripMargin(
        `||------------------------|
         |fun(fun(fun(fun(fun([abcdef, ghijklm])))))
         ||------------------------|`
      )
    )
  })

  it("renderCompact", () => {
    assert.strictEqual(
      doc.renderCompact,
      String.stripMargin(
        `||------------------------|
         |fun(
         |fun(
         |fun(
         |fun(
         |fun(
         |[ abcdef
         |, ghijklm ])))))
         ||------------------------|`
      )
    )
  })
})
