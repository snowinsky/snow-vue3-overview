import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/*############################### enter code here ####################################*/
import eslintPlugin from 'vite-plugin-eslint';
import pagesAutoRouter from 'vite-plugin-pages';
import pagesAutoLayout from 'vite-plugin-vue-layouts';
/*############################### enter code here ####################################*/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /*################################# enter code here ##################################*/
    eslintPlugin(),
      //自动加路由
    pagesAutoRouter({
      pagesDir: [{dir: './src/views', baseRoute: ''}],
      exclude: ['**/components/*.vue'],
      nuxtStyle: true,
    }),
      //自动加嵌套路由
    pagesAutoLayout({
      layoutsDirs: ['src/layouts']
    }),
    /*################################# enter code here ##################################*/
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
