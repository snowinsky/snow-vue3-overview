import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

//##########################自定义功能####################################
import eslintPlugin from 'vite-plugin-eslint';
import vueJsx from '@vitejs/plugin-vue-jsx';
import pagesAutoRouter from 'vite-plugin-pages';
import pagesAutoLayout from 'vite-plugin-vue-layouts';
//vite vue components auto import
import viteVueComponentsAutoImport from 'unplugin-vue-components/vite';
import {
    //AntDesignVueResolver,
    ElementPlusResolver,
    //VantResolver,
} from 'unplugin-vue-components/resolvers';

import {
    createStyleImportPlugin,
    //AndDesignVueResolve,
    //VantResolve,
    ElementPlusResolve,
    //NutuiResolve,
    //AntdResolve,
} from 'vite-plugin-style-import';
import autoImport from 'unplugin-auto-import/vite';
//#############################自定义功能#################################

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        //#########################自定义功能#####################################
        eslintPlugin(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        pagesAutoRouter({
            pagesDir: [{dir: 'src/views', baseRoute: ''}],
            exclude: ['**/components/*.vue'],
            nuxtStyle: true
        }),
        pagesAutoLayout(),
        viteVueComponentsAutoImport({
            resolvers: [
                /*AntDesignVueResolver({
                    resolveIcons: true,
                    cjs: true,
                    importStyle: false
                }),*/
                ElementPlusResolver(),
                //VantResolver(),
            ],
        }),
        createStyleImportPlugin({
            resolves: [
                //AndDesignVueResolve(),
                //VantResolve(),
                ElementPlusResolve(),
                //NutuiResolve(),
                //AntdResolve(),
            ],
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name: string) => {
                        //return `ant-design-vue/es/${name}/style/index`
                        return `element-plus/es/components/${name}/style/index`;
                    },
                },
            ],
        }),
        autoImport({
            imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
            // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
            dts: 'src/auto-import.d.ts'
        }),
        //##########################自定义功能####################################
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
