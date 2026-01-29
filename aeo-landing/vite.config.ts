import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import prerender from '@prerenderer/rollup-plugin'
import puppeteerRenderer from '@prerenderer/renderer-puppeteer'

// All routes to prerender for LLM crawlability
const routesToPrerender = [
  '/',
  '/learn',
  '/checklist',
  '/what-is-aeo',
  '/aeo-vs-seo',
  '/how-to-optimize-for-chatgpt',
  '/first-50-words-rule',
  '/10-run-consistency-test',
  '/3-layer-chatgpt-architecture',
  '/case-study/fuegenix',
  '/100-brands-audit',
  '/glossary/answer-engine-optimization',
  '/aeo-audit',
  '/aeo-consulting',
  '/report/fuegenix',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        prerender({
          routes: routesToPrerender,
          renderer: puppeteerRenderer,
          rendererOptions: {
            renderAfterDocumentEvent: 'render-complete',
          },
        }),
      ],
    },
  },
})
