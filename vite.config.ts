import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import lessToJS from 'less-vars-to-js'

const fs = require('fs')
const path = require('path');
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/theme.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    })
  ],
  resolve: {
    alias: {"@": path.resolve(__dirname, "./src")},
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },

  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript，支持 less 内联 JS
        javascriptEnabled: true,
        additionalData:  `@import "${path.resolve(__dirname, './src/styles/variables.less')}";`,
        modifyVars: themeVariables
      },
    },
  },
})
