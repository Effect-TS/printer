import * as path from "path"
import { defineProject } from "vitest/config"

export default defineProject({
  test: {
    include: ["./test/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@effect/printer/test": path.join(__dirname, "../printer", "test"),
      "@effect/printer": path.join(__dirname, "../printer", "src"),
      "@effect/printer-ansi/test": path.join(__dirname, "test"),
      "@effect/printer-ansi": path.join(__dirname, "src")
    }
  }
})
