import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/*.mp4', '**/*.mkv', '**/*.avi', '**/dist/**', '**/public/hero-sequence/**', '**/.temp*/**', '**/scratch*/**', '**/*.db*']
    }
  }
})
