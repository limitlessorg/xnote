import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'
import visualizer from 'rollup-plugin-visualizer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), viteCompression()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      plugins: [
        visualizer({
          open: true // 构建完成后自动打开可视化分析页面
        })
      ],
      output: {
        manualChunks: {
          echarts: ['echarts'],
          excalidraw: ['@excalidraw/excalidraw'],
          emojimart: ['emoji-mart']
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/', // 关系接口
        changeOrigin: true, // 是否允许跨域
        ws: true
      },
      '/oss': {
        target: 'http://localhost:4000/api/', // 对象存储接口
        changeOrigin: true, // 是否允许跨域
        ws: true
      }
    }
  }
})
