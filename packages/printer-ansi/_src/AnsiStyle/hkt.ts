/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops Show
 */
export const getShow = Show<AnsiStyle>((style) =>
  SGR.toEscapeSequence(
    Chunk(
      Option.some(SGR.Reset),
      style.foreground,
      style.background,
      style.bold,
      style.italicized,
      style.underlined
    ).compact()
  )
);

function getFirstAssociativeOption<A>(): Associative<Option<A>> {
  return Associative((x, y) => (x.isNone() ? y : x));
}

/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops Associative
 */
export const AnsiStyleAssociative = Associative.struct<AnsiStyle>({
  foreground: getFirstAssociativeOption(),
  background: getFirstAssociativeOption(),
  bold: getFirstAssociativeOption(),
  italicized: getFirstAssociativeOption(),
  underlined: getFirstAssociativeOption()
});

function getFirstAssociativeIdentityOption<A>(): AssociativeIdentity<Option<A>> {
  return AssociativeIdentity(Option.none, getFirstAssociativeOption<A>().combine);
}

/**
 * @tsplus static ets/printer-ansi/AnsiStyle/Ops AssociativeIdentity
 */
export const AnsiStyleAssociativeIdentity = AssociativeIdentity.struct<AnsiStyle>({
  foreground: getFirstAssociativeIdentityOption(),
  background: getFirstAssociativeIdentityOption(),
  bold: getFirstAssociativeIdentityOption(),
  italicized: getFirstAssociativeIdentityOption(),
  underlined: getFirstAssociativeIdentityOption()
});
