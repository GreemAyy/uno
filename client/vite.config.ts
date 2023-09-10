import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'
const option = {pretty:true}
const locals = {name:'My Pug'}


export default defineConfig({
  plugins: [
    //@ts-ignore
    vue(),pugPlugin(option, locals),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
