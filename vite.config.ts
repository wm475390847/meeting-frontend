import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import lessToJS from 'less-vars-to-js'

const { name, version } = require('./package.json');
const fs = require('fs')
const path = require('path');
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/theme.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? `//s.newscdn.cn/${name}/${version}/` : '',
    build: {
      rollupOptions: {
        output: {
          // 入口文件名
          entryFileNames: 'assets/[name].js',
          // 块文件名
          chunkFileNames: 'assets/[name].js',
          // 资源文件名 css 图片等等
          assetFileNames: 'assets/[name].[ext]',
        },
      },
      minify: false
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },

    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript，支持 less 内联 JS
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, './src/styles/variables.less')}";`,
          modifyVars: themeVariables
        },
      },
    },

    server: {
      port: 3000,
      proxy: {
        '/meeting-backend': {
          target: 'http://test.qa-meeting.xinhuazhiyun.com',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/meeting-backend/, '')
        },
      }
    }
  }
})
