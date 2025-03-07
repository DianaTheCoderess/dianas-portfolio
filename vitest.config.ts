/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import { getViteConfig } from "astro/config"

export default getViteConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts", "./src/tests/setup-dom.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
  },
})
