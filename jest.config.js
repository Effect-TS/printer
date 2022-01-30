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
  setupFilesAfterEnv: [],
  modulePathIgnorePatterns: [
    "<rootDir>/packages/.*/build",
    "<rootDir>/packages/.*/dist",
    "<rootDir>/packages/.*/compiler-debug",
    "<rootDir>/_tmp"
  ],
  verbose: true,
  moduleNameMapper: {},
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json"
    }
  }
}
