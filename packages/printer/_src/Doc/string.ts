/**
 * A document containing a string of text. Newline characters (`\n`) contained
 * in the provided string will be disregarded (i.e. not rendered) in the output
 * document.
 *
 * @tsplus static ets/printer/Doc/Ops string
 */
export function string(str: string): Doc<never> {
  return Doc.cats(
    str
      .split("\n")
      .map((s) =>
        s.length === 0
          ? Doc.empty
          : s.length === 1
          ? Doc.char(s)
          : Doc.text(s)
      )
  )
}
