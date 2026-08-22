import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['ead2-2409-40d4-1073-34b7-a1ab-f83f-9308-d5fc.ngrok-free.app']
  }
})
