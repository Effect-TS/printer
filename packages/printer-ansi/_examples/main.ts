export const doc = Doc.hsep([
  Doc.text("red"),
  Doc.vsep([
    Doc.hsep([
      Doc.text("blue+u"),
      Doc.text("bold").annotate(
        AnsiStyle.Associative.combine(AnsiStyle.color(Color.Blue), AnsiStyle.bold)
      ),
      Doc.text("blue+u")
    ]).annotate(
      AnsiStyle.Associative.combine(AnsiStyle.color(Color.Blue), AnsiStyle.underlined)
    ),
    Doc.text("red")
  ]).align
]).annotate(
  AnsiStyle.color(Color.Red)
)

console.log(doc.renderPrettyAnsiDefault)
