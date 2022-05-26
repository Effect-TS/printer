import { DocToken } from "@effect/printer/DocTree/_internal/DocToken"
import { Parser } from "@effect/printer/DocTree/_internal/Parser"

function nextToken<A>(): Parser<DocStream<A>, DocToken<A>> {
  return (stream) => {
    switch (stream._tag) {
      case "FailedStream": {
        throw new Error("bug, found a failed stream while parsing!")
      }
      case "EmptyStream": {
        return Option.none
      }
      case "CharStream": {
        return Option.some(Tuple(DocToken.char(stream.char), stream.stream))
      }
      case "TextStream": {
        return Option.some(Tuple(DocToken.text(stream.text), stream.stream))
      }
      case "LineStream": {
        return Option.some(Tuple(DocToken.line(stream.indentation), stream.stream))
      }
      case "PushAnnotationStream": {
        return Option.some(
          Tuple(DocToken.pushAnnotation(stream.annotation), stream.stream)
        )
      }
      case "PopAnnotationStream": {
        return Option.some(Tuple(DocToken.popAnnotation, stream.stream))
      }
    }
  }
}

function getParser<A>() {
  const Monad = Parser.getMonad<DocStream<A>>()
  const AssociativeEither = Parser.getAssociativeEither<DocStream<A>>()
  const ChainRec = Parser.getChainRec<DocStream<A>>()

  function succeed<B>(a: LazyArg<B>) {
    return Monad.map(a)(Monad.any())
  }

  function flatMap<B, C>(self: Parser<DocStream<A>, B>, f: (a: B) => Parser<DocStream<A>, C>): Parser<DocStream<A>, C> {
    return Monad.flatten(Monad.map(f)(self))
  }

  function orElse<B, C>(
    self: Parser<DocStream<A>, B>,
    that: LazyArg<Parser<DocStream<A>, C>>
  ): Parser<DocStream<A>, B | C> {
    return Monad.map((e: Either<B, C>) => e._tag === "Left" ? e.left : e.right)(
      AssociativeEither.orElseEither(that)(self)
    )
  }

  function many(
    parser: Parser<DocStream<A>, DocTree<A>>
  ): Parser<DocStream<A>, Chunk<DocTree<A>>> {
    return flatMap(parser, (head) =>
      orElse(
        ChainRec.chainRec((acc: Chunk<DocTree<A>>) =>
          orElse(
            Monad.map((a: DocTree<A>) => Either.left(acc.append(a)))(parser),
            succeed(Either.right(acc))
          )
        )(Chunk.single(head)),
        succeed(Chunk.empty<DocTree<A>>())
      ))
  }

  function mergeTrees(trees: Chunk<DocTree<A>>): DocTree<A> {
    if (trees.isEmpty()) {
      return DocTree.empty
    }
    const head = trees.unsafeHead()
    const tail = trees.unsafeTail()
    return tail.isEmpty() ? head : DocTree.concat(trees)
  }

  const tree: Parser<DocStream<A>, DocTree<A>> = flatMap(nextToken<A>(), (token) => {
    switch (token._tag) {
      case "EmptyToken": {
        return succeed(DocTree.empty)
      }
      case "CharToken": {
        return succeed(DocTree.char<A>(token.char))
      }
      case "TextToken": {
        return succeed(DocTree.text<A>(token.text))
      }
      case "LineToken": {
        return succeed(DocTree.line<A>(token.indentation))
      }
      case "PushAnnotationToken": {
        return flatMap(parser, (annotatedContents) =>
          Monad.map(
            () => DocTree.annotation(annotatedContents, token.annotation)
          )(
            // Make sure to handle the subsequent pop annotation token
            nextToken()
          ))
      }
      case "PopAnnotationToken": {
        return () => Option.none
      }
    }
  })

  const parser: Parser<DocStream<A>, DocTree<A>> = Monad.map((trees: Chunk<DocTree<A>>) => mergeTrees(trees))(
    many(tree)
  )

  return parser
}

/**
 * @tsplus fluent ets/printer/DocStream treeForm
 */
export function treeForm<A>(stream: DocStream<A>): DocTree<A> {
  return getParser<A>()(stream).fold(
    () => {
      throw new Error("bug, failed to convert DocStream to DocTree!")
    },
    ({ tuple: [docTree, remaining] }) => {
      if (remaining._tag !== "EmptyStream") {
        throw new Error("bug, DocStream not fully consumed during DocTree parsing!")
      }
      return docTree
    }
  )
}
