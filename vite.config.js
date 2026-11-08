import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['3339-2409-40d4-100d-8f09-a5a5-10f5-675c-92cb.ngrok-free.app']
  }
})
