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

console.log(doc.renderPrettyDefault)
