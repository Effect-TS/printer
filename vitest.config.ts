/// <reference types="vitest" />

import babel from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelConfig = require("./.babel.mjs.json")

export default defineConfig({
  plugins: [babel({ babel: babelConfig })],
  test: {
    include: ["packages/*/test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["packages/*/test/utils/**/*.ts", "./test/**/*.init.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@effect/printer/test": path.join(__dirname, "packages/printer/test"),
      "@effect/printer": path.join(__dirname, "packages/printer/src"),
      "@effect/printer-ansi/test": path.join(__dirname, "packages/printer-ansi/test"),
      "@effect/printer-ansi": path.join(__dirname, "packages/printer-ansi/src")
    }
  }
})
