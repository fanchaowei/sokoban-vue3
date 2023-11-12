import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': `/${path.resolve(__dirname, 'src')}`
    }
  }
})
