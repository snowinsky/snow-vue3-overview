import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

/*############################### enter code here ####################################*/
import eslintPlugin from 'vite-plugin-eslint';
import pagesAutoRouter from 'vite-plugin-pages';
import pagesAutoLayout from 'vite-plugin-vue-layouts';
//千万不要太依赖这个插件，很多是自动import之后无效的, 比如vue-route的createRoute方法，奇怪的是其他方法生效
import viteAutoImport from 'unplugin-auto-import/vite';
//component组件库的自动按需注册，也是不要太依赖，有些组件还是有问题，而且和组件库的版本有挺大的关系
import viteVueComponentsAutoImport from 'unplugin-vue-components/vite';
import {
    ElementPlusResolver,
} from 'unplugin-vue-components/resolvers';

import {
    createStyleImportPlugin,
    ElementPlusResolve,
} from 'vite-plugin-style-import';
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
        //自动导入列出的包中的指令
        viteAutoImport({
            imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
            include: [
                /\.[tj]sx?$/,
                /\.vue$/,
                /\.vue\?vue/,
                /\.md$/,
            ],
            // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
            dts: 'src/plugin-out/auto-import.d.ts'
        }),
        viteVueComponentsAutoImport({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        createStyleImportPlugin({
            resolves: [
                ElementPlusResolve(),
            ],
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name: string) => {
                        return `element-plus/theme-chalk/${name}.css`;
                    },
                },
            ],
        }),
        /*################################# enter code here ##################################*/
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
