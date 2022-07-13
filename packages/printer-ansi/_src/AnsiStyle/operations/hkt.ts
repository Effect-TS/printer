/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops Show
 */
export const getShow = Show<AnsiStyle>((style) =>
  SGR.toEscapeSequence(
    Chunk(
      Maybe.some(SGR.Reset),
      style.foreground,
      style.background,
      style.bold,
      style.italicized,
      style.underlined
    ).compact
  )
)

function getFirstAssociativeMaybe<A>(): Associative<Maybe<A>> {
  return Associative((x, y) => (x.isNone() ? y : x))
}

/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops Associative
 */
export const AnsiStyleAssociative = Associative.struct<AnsiStyle>({
  foreground: getFirstAssociativeMaybe(),
  background: getFirstAssociativeMaybe(),
  bold: getFirstAssociativeMaybe(),
  italicized: getFirstAssociativeMaybe(),
  underlined: getFirstAssociativeMaybe()
})

function getFirstAssociativeIdentityMaybe<A>(): AssociativeIdentity<Maybe<A>> {
  return AssociativeIdentity(Maybe.none, getFirstAssociativeMaybe<A>().combine)
}

/**
 * @tsplus static effect/printer-ansi/AnsiStyle.Ops AssociativeIdentity
 */
export const AnsiStyleAssociativeIdentity = AssociativeIdentity.struct<AnsiStyle>({
  foreground: getFirstAssociativeIdentityMaybe(),
  background: getFirstAssociativeIdentityMaybe(),
  bold: getFirstAssociativeIdentityMaybe(),
  italicized: getFirstAssociativeIdentityMaybe(),
  underlined: getFirstAssociativeIdentityMaybe()
})
