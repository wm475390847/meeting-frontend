import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import vitePluginImp from 'vite-plugin-imp'
import lessToJS from 'less-vars-to-js'
const { name, version } = require('./package.json');

const fs = require('fs')
const path = require('path');
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/theme.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig({
  // base: `//t.newscdn.cn/${name}/${version}/`,
  plugins: [
    react(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "antd",
    //       style: (name) => {
    //         console.log(name)
    //         return `antd/lib/${name}/style/index.less`
    //       },
    //     },
    //   ],
    // })
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
    proxy: {
      '/sports-backend': {
        target: 'http://test.qa-ai-sports.xinhuazhiyun.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sports-backend/, '')
      },
    }
  }
})
