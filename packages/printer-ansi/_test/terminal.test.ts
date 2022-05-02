const complex = Doc.hsep([
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
  ]).align()
]).annotate(
  AnsiStyle.color(Color.Red)
);

describe.concurrent("Terminal", () => {
  it("empty", () => {});
  //   describe("Colors/Layers", () => {
  //     const fg = (color: Color): AnsiDoc => D.annotate_(D.text("foo"), Style.color(color))

  //     const fgDull = (color: Color): AnsiDoc =>
  //       D.annotate_(D.text("foo"), Style.colorDull(color))

  //     const bg = (color: Color): AnsiDoc =>
  //       D.annotate_(D.text("foo"), Style.bgColor(color))

  //     const bgDull = (color: Color): AnsiDoc =>
  //       D.annotate_(D.text("foo"), Style.bgColorDull(color))

  //     it("black", () => {
  //       expect(R.renderPrettyDefault(fg(C.black))).toBe("\u001b[0;90mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.black))).toBe("\u001b[0;30mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.black))).toBe("\u001b[0;100mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.black))).toBe("\u001b[0;40mfoo\u001b[0m")
  //     })

  //     it("red", () => {
  //       expect(R.renderPrettyDefault(fg(C.red))).toBe("\u001b[0;91mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.red))).toBe("\u001b[0;31mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.red))).toBe("\u001b[0;101mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.red))).toBe("\u001b[0;41mfoo\u001b[0m")
  //     })

  //     it("green", () => {
  //       expect(R.renderPrettyDefault(fg(C.green))).toBe("\u001b[0;92mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.green))).toBe("\u001b[0;32mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.green))).toBe("\u001b[0;102mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.green))).toBe("\u001b[0;42mfoo\u001b[0m")
  //     })

  //     it("yellow", () => {
  //       expect(R.renderPrettyDefault(fg(C.yellow))).toBe("\u001b[0;93mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.yellow))).toBe("\u001b[0;33mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.yellow))).toBe("\u001b[0;103mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.yellow))).toBe("\u001b[0;43mfoo\u001b[0m")
  //     })

  //     it("blue", () => {
  //       expect(R.renderPrettyDefault(fg(C.blue))).toBe("\u001b[0;94mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.blue))).toBe("\u001b[0;34mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.blue))).toBe("\u001b[0;104mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.blue))).toBe("\u001b[0;44mfoo\u001b[0m")
  //     })

  //     it("magenta", () => {
  //       expect(R.renderPrettyDefault(fg(C.magenta))).toBe("\u001b[0;95mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.magenta))).toBe("\u001b[0;35mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.magenta))).toBe("\u001b[0;105mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.magenta))).toBe("\u001b[0;45mfoo\u001b[0m")
  //     })

  //     it("cyan", () => {
  //       expect(R.renderPrettyDefault(fg(C.cyan))).toBe("\u001b[0;96mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.cyan))).toBe("\u001b[0;36mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.cyan))).toBe("\u001b[0;106mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.cyan))).toBe("\u001b[0;46mfoo\u001b[0m")
  //     })

  //     it("white", () => {
  //       expect(R.renderPrettyDefault(fg(C.white))).toBe("\u001b[0;97mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(fgDull(C.white))).toBe("\u001b[0;37mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bg(C.white))).toBe("\u001b[0;107mfoo\u001b[0m")
  //       expect(R.renderPrettyDefault(bgDull(C.white))).toBe("\u001b[0;47mfoo\u001b[0m")
  //     })
  //   })

  //   describe("Underlined", () => {
  //     it("underlined", () => {
  //       expect(R.renderPrettyDefault(D.annotate_(D.text("foo"), Style.underlined))).toBe(
  //         "\u001b[0;4mfoo\u001b[0m"
  //       )
  //     })
  //   })

  //   describe("Bold", () => {
  //     it("bold", () => {
  //       expect(R.renderPrettyDefault(D.annotate_(D.text("foo"), Style.bold))).toBe(
  //         "\u001b[0;1mfoo\u001b[0m"
  //       )
  //     })
  //   })

  //   describe("Complex Example", () => {
  //     it("should combine annotations appropriately", () => {
  //       expect(R.renderPrettyDefault(complex)).toBe(
  //         `
  // \u001b[0;91mred \u001b[0;94;4mblue+u \u001b[0;94;1;4mbold\u001b[0;94;4m blue+u\u001b[0;91m
  //     red\u001b[0m
  //         `.trim()
  //       )
  //     })
  //   })

  //   describe("Annotations", () => {
  //     it("should re-annotate a document", () => {
  //       const reAnnotated = R.renderPrettyDefault(
  //         D.reAnnotate_(complex, (s) =>
  //           Style.Associative.combine(Style.bgColor(C.white), s)
  //         )
  //       )

  //       expect(reAnnotated).toBe(
  //         `
  // \u001b[0;91;107mred \u001b[0;94;107;4mblue+u \u001b[0;94;107;1;4mbold\u001b[0;94;107;4m blue+u\u001b[0;91;107m
  //     red\u001b[0m
  //         `.trim()
  //       )
  //     })

  //     it("should alter existing annotations", () => {
  //       const altered = R.renderPrettyDefault(
  //         D.alterAnnotations_(complex, () => [Style.bold, Style.color(C.green)])
  //       )

  //       expect(altered).toBe(
  //         `
  // \u001b[0;1m\u001b[0;92;1mred \u001b[0;92;1m\u001b[0;92;1mblue+u \u001b[0;92;1m\u001b[0;92;1mbold\u001b[0;1m\u001b[0;92m blue+u\u001b[0;1m\u001b[0;92m
  //     red\u001b[0;1m\u001b[0m
  //         `.trim()
  //       )
  //     })

  //     it("should remove all annotations", () => {
  //       expect(R.renderPrettyDefault(D.unAnnotate(complex))).toBe(
  //         `
  // red blue+u bold blue+u
  //     red
  //         `.trim()
  //       )
  //     })
  //   })
});
