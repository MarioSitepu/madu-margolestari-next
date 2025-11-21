import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import prerender from 'vite-plugin-prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Prerender hanya untuk production build
    ...(process.env.NODE_ENV === 'production' ? [
      prerender({
        staticDir: './dist',
        routes: [
          '/',
          '/about',
          '/product',
          '/article',
        ],
        renderer: {
          renderAfterDocumentEvent: 'render-event',
          renderAfterTime: 5000,
          maxConcurrentRoutes: 1,
        },
      })
    ] : []),
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
