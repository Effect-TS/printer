/**
 * @tsplus static ets/printer-ansi/SGR/Ops toEscapeSequence
 */
export function toEscapeSequence(sgrs: Chunk<SGR>): string {
  return csi("m", sgrs.map((sgr) => sgr.toCode()))
}

function csi(controlFunction: string, controlParameters: Chunk<number>): string {
  const params = controlParameters.map((param) => param.toString()).join(";")
  return `\u001b[${params}${controlFunction}`
}
