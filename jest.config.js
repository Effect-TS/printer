// eslint-disable-next-line
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["packages/**/src/**/*.ts"],
  setupFiles: ["./scripts/jest-setup.ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/packages/.*/build",
    "<rootDir>/packages/.*/compiler-debug",
    "<rootDir>/_tmp"
  ],
  verbose: true,
  moduleNameMapper: {
    "@effect-ts/core/(.*)$": "<rootDir>/packages/core/build/$1",
    "@effect-ts/core$": "<rootDir>/packages/core/build",
    "@effect-ts/system/(.*)$": "<rootDir>/packages/system/build/$1",
    "@effect-ts/system$": "<rootDir>/packages/system/build",
    "@effect-ts/tracing-utils/(.*)$": "<rootDir>/packages/tracing-utils/build/$1",
    "@effect-ts/tracing-utils$": "<rootDir>/packages/tracing-utils/build"
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
      compiler: "ttypescript"
    }
  }
}
