/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import { getViteConfig } from "astro/config"

// biome-ignore lint/style/noDefaultExport: <explanation>
export default getViteConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["json", "json-summary", "text"],
      reportOnFailure: true,
    },
    globals: true,
  },
})
