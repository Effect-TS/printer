describe.concurrent("Flatten", () => {
  it("isFlattened", () => {
    assert.isTrue(Flatten.isFlattened(Flatten.Flattened(1)))
    assert.isFalse(Flatten.isFlattened(Flatten.NeverFlat))
  })

  it("isAlreadyFlat", () => {
    assert.isTrue(Flatten.isAlreadyFlat(Flatten.AlreadyFlat))
    assert.isFalse(Flatten.isAlreadyFlat(Flatten.NeverFlat))
  })

  it("isNeverFlat", () => {
    assert.isTrue(Flatten.isNeverFlat(Flatten.NeverFlat))
    assert.isFalse(Flatten.isNeverFlat(Flatten.AlreadyFlat))
  })

  it("map", () => {
    assert.deepStrictEqual(Flatten.Flattened(1).map((n) => n + 1), Flatten.Flattened(2))
    assert.deepStrictEqual(Flatten.AlreadyFlat.map(identity), Flatten.AlreadyFlat)
    assert.deepStrictEqual(Flatten.NeverFlat.map(identity), Flatten.NeverFlat)
  })
})
