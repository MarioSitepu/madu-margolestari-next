import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Note: Prerender disabled due to ES module compatibility issues
    // SEO is still optimized with:
    // - react-helmet-async for meta tags
    // - Dynamic sitemap from Express backend
    // - Structured data (Schema.org)
    // - Google can crawl JavaScript-rendered content
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
