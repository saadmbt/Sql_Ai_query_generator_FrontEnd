import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/",
  plugins: [react(),tailwindcss()],
  build: {
    minify: "esbuild",
    outDir: "dist",
  },
  server: {
    port: 3000,
    strictPort: true
  }
})
