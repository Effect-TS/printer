import type { DocTreeToken } from "@effect/printer/internal/DocTree/token"
import * as DTT from "@effect/printer/internal/DocTree/token"
import * as Chunk from "@fp-ts/data/Chunk"
import { pipe } from "@fp-ts/data/Function"
import * as Option from "@fp-ts/data/Option"

interface DocTreeParser<S, A> {
  (stream: S): Option.Option<readonly [A, S]>
}

function succeed<S, A>(value: A): DocTreeParser<S, A> {
  return (stream) => Option.some([value, stream] as const)
}

function map<A, B>(f: (a: A) => B) {
  return <S>(self: DocTreeParser<S, A>): DocTreeParser<S, B> => {
    return (stream) => pipe(self(stream), Option.map(([a, s]) => [f(a), s]))
  }
}

function flatMap<A, S, B>(f: (a: A) => DocTreeParser<S, B>) {
  return (self: DocTreeParser<S, A>): DocTreeParser<S, B> => {
    return (stream) => pipe(self(stream), Option.flatMap(([a, s1]) => f(a)(s1)))
  }
}

function many<S, A>(parser: DocTreeParser<S, A>): DocTreeParser<S, ReadonlyArray<A>> {
  return (stream) =>
    pipe(
      parser(stream),
      Option.map(([head, next]) => {
        const output: Array<A> = [head]
        let input: S = next
        let result = parser(next)
        while (result._tag === "Some") {
          const [value, nextInput] = result.value
          output.push(value)
          input = nextInput
          result = parser(nextInput)
        }
        return [output, input] as const
      })
    )
}

function nextToken<A>(): DocTreeParser<DocStream<A>, DocTreeToken<A>> {
  return (stream) => {
    switch (stream._tag) {
      case "FailedStream": {
        throw new Error("bug, found a failed stream while parsing!")
      }
      case "EmptyStream": {
        return Option.none
      }
      case "CharStream": {
        return Option.some([DTT.char(stream.char), stream.stream] as const)
      }
      case "TextStream": {
        return Option.some([DTT.text(stream.text), stream.stream] as const)
      }
      case "LineStream": {
        return Option.some([DTT.line(stream.indentation), stream.stream] as const)
      }
      case "PushAnnotationStream": {
        return Option.some(
          [DTT.pushAnnotation(stream.annotation), stream.stream] as const
        )
      }
      case "PopAnnotationStream": {
        return Option.some([DTT.popAnnotation, stream.stream])
      }
    }
  }
}

function mergeTrees<A>(trees: ReadonlyArray<DocTree<A>>): DocTree<A> {
  if (trees.length === 0) {
    return DocTree.empty
  }
  const head = trees[0]!
  const tail = trees.slice(1)
  return tail.length === 0 ? head : DocTree.concat(Chunk.fromIterable(trees))
}

function tree<A>(parser: () => DocTreeParser<DocStream<A>, DocTree<A>>): DocTreeParser<DocStream<A>, DocTree<A>> {
  return pipe(
    nextToken<A>(),
    flatMap((token) => {
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
          return pipe(
            parser(),
            flatMap((annotatedContents) =>
              pipe(
                // Make sure to handle the subsequent pop annotation token
                nextToken<A>(),
                map(() => DocTree.annotation(token.annotation)(annotatedContents))
              )
            )
          )
        }
        case "PopAnnotationToken": {
          return () => Option.none
        }
      }
    })
  )
}

/** @internal */
export function parser<A>(): DocTreeParser<DocStream<A>, DocTree<A>> {
  return pipe(
    many(tree<A>(parser)),
    map(mergeTrees)
  )
}
