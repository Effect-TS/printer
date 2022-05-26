describe.concurrent("DocStream", () => {
  it("isFailedStream", () => {
    assert.isTrue(DocStream.isFailedStream(DocStream.failed))
    assert.isFalse(DocStream.isFailedStream(DocStream.empty))
  })

  it("isEmptyStream", () => {
    assert.isTrue(DocStream.isEmptyStream(DocStream.empty))
    assert.isFalse(DocStream.isEmptyStream(DocStream.failed))
  })

  it("isCharStream", () => {
    assert.isTrue(DocStream.isCharStream(DocStream.char(DocStream.empty, "a")))
    assert.isFalse(DocStream.isCharStream(DocStream.empty))
  })

  it("isTextStream", () => {
    assert.isTrue(DocStream.isTextStream(DocStream.text(DocStream.empty, "foo")))
    assert.isFalse(DocStream.isTextStream(DocStream.empty))
  })

  it("isLineStream", () => {
    assert.isTrue(DocStream.isLineStream(DocStream.line(DocStream.empty, 4)))
    assert.isFalse(DocStream.isLineStream(DocStream.empty))
  })

  it("isPushAnnotationStream", () => {
    assert.isTrue(DocStream.isPushAnnotationStream(DocStream.pushAnnotation(DocStream.empty, 1)))
    assert.isFalse(DocStream.isPushAnnotationStream(DocStream.empty))
  })

  it("isPopAnnotationStream", () => {
    assert.isTrue(DocStream.isPopAnnotationStream(DocStream.popAnnotation(DocStream.empty)))
    assert.isFalse(DocStream.isPopAnnotationStream(DocStream.empty))
  })
})
