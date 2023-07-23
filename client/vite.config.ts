import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'events': 'events',
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      // external: ['micro-starknet']
    }
  },
})