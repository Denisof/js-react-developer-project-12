import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  mode: 'development',
  plugins: [react()],
  build: {
    minify: false,  // Отключаем минификацию
    sourcemap: true, // Включаем source maps для удобства отладки
    rollupOptions: {
      output: {
        compact: false,  // Отключаем сжатие кода
        manualChunks: undefined, // Запрещаем разбиение кода на чанки
      },
      treeshake: false,  // Отключаем tree-shaking (удаление неиспользуемого кода)
    },
    terserOptions: {
      compress: false, // Отключаем сжатие
      mangle: false, // Отключаем сокращение имен переменных
      format: {
        beautify: true, // Оставляем читаемый код
        comments: true, // Оставляем комментарии
      },
    },
  },
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
