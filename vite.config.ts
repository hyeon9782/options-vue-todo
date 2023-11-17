import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    // jest와 같은 전역 테스트 API 사용
    globals: true,
    // happy-dom으로 DOM 시뮬레이션
    // (피어 의존성으로 happy-dom을 설치해야 함)
    environment: 'happy-dom'
  }
})
