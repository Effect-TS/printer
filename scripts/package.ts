import * as A from "fp-ts/lib/Array"
import { parseJSON } from "fp-ts/lib/Either"
import { flow } from "fp-ts/lib/function"
import { pipe } from "fp-ts/lib/pipeable"
import * as TE from "fp-ts/lib/TaskEither"

import { copy, onLeft, onRight, readFile, runMain, writeFile } from "./_common"

const copyReadme = copy("./README.md", "./build", { update: true })

const loadPackageJson = pipe(
  readFile("./package.json", "utf8"),
  TE.chainEitherK((content) => parseJSON(content, () => new Error("json parse error")))
)

const writePackageJsonContent = (content: any) =>
  pipe(
    JSON.stringify(
      {
        name: content["name"],
        version: content["version"],
        private: false,
        license: content["license"],
        repository: content["repository"],
        sideEffects: content["sideEffects"],
        dependencies: content["dependencies"],
        peerDependencies: content["peerDependencies"],
        gitHead: content["gitHead"],
        main: "./index.js",
        module: "./esm/index.js",
        typings: "./index.d.ts",
        publishConfig: {
          access: "public"
        }
      },
      null,
      2
    ),
    (str) => writeFile("./build/package.json", str)
  )

const getModules = flow(
  (content: any) => content?.config?.modules,
  TE.fromPredicate(
    (x): x is string[] => Array.isArray(x) && x.every((y) => typeof y === "string"),
    () => new Error("missing modules config")
  )
)

const getSide = flow(
  (content: any) => content?.config?.side,
  (x): string[] => (Array.isArray(x) && x.every((y) => typeof y === "string") ? x : [])
)

const writeModulePackageJson = (modules: string[], content: any) => {
  const side = getSide(content)
  return A.array.traverse(TE.taskEither)(modules, (m) =>
    writeFile(
      `./build/${m}/package.json`,
      JSON.stringify(
        {
          sideEffects: side.includes(m),
          main: "./index.js",
          module: `${A.range(1, m.split("/").length)
            .map(() => "../")
            .join("")}esm/${m}/index.js`,
          typings: `./index.d.ts`
        },
        null,
        2
      )
    )
  )
}

pipe(
  copyReadme,
  TE.apSecond(loadPackageJson),
  TE.chainFirst(writePackageJsonContent),
  TE.bindTo("content"),
  TE.bind("modules", ({ content }) => getModules(content)),
  TE.chainFirst(({ content, modules }) => writeModulePackageJson(modules, content)),
  TE.fold(onLeft, onRight("package copy succeeded!")),
  runMain
)
