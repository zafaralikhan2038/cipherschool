import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "https://exam-application-server.onrender.com",
    },
  },
  plugins: [react()],
})
