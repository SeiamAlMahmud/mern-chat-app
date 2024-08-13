import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: "5173", // make a custom port for vite
    proxy: {
      "/api": "http://localhost:3000", // make a custom port for fetch request
    }
  }
})
