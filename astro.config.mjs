import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import netlify from "@astrojs/netlify"
import react from "@astrojs/react"
import { storyblok } from "@storyblok/astro"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { loadEnv } from "vite"

const { STORYBLOK_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "")
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  integrations: [
    react(),
    storyblok({
      accessToken: STORYBLOK_TOKEN,
      components: {
        blogPost: "storyblok/BlogPost",
      },
      apiOptions: {
        region: "eu",
      },
    }),
  ],

  site: "https://diana.bendziula.com",
  base: "/",
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
})
