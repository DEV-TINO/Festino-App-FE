import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // Docker 컨테이너 외부에서 접근 가능하게 설정
    port: 3000, // Vite 개발 서버 포트
    strictPort: true, // 포트가 사용 중일 경우 에러 발생 (자동 변경 방지)
    watch: {
      usePolling: true, // 파일 변경 감지 활성화 (Docker 환경에서는 필수)
    },
    hmr: {
      clientPort: 3000, // HMR을 위한 클라이언트 포트 (컨테이너 환경에서 필요)
    },
  },
});
