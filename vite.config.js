import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import deletePlugin from 'rollup-plugin-delete'
import eslintPlugin from 'vite-plugin-eslint'
// import esbuild from 'rollup-plugin-esbuild'
import copy from 'rollup-plugin-copy'
import { VantResolver } from '@vant/auto-import-resolver'
import tailwindcss from 'tailwindcss'
import postCssPxToRem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'

const timestamp = new Date().getTime()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // eslintPlugin({
    //   include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
    // }),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  presets: ['@babel/preset-env'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  define: {
    'process.env': {}
  },
  server: {
    // https: true,
    host: '0.0.0.0', // 配置了0.0.0.0，静态资源服务将以localhost和本地Ip进行启动
    port: 9025,
    open: true,
    proxy: {
      '/api': {
        target: 'https://xm337.life/api/v1/passport/auth/register', // 真实api地址
        changeOrigin: true,
        rewrite: (path)=>path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist_xm_reg',
    // 静态资源的存放目录
    assetsDir: 'assets',
    // 类型： boolean | 'terser' | 'esbuild'
    // 必须开启：使用terserOptions才有效果
    minify: 'terser',
    // 适配低版本浏览器
    target: ['edge90', 'chrome90', 'firefox90', 'safari15', 'es2015', 'ios14'],
    // https://terser.org/docs/api-reference/#minify-options
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    // https://rollupjs.org/configuration-option
    rollupOptions: {
      // 静态资源分类打包
      output: {
        // 入口文件
        entryFileNames: (a, b, c)=>{
          return `assets/js/[name]-[hash].${timestamp}.js`
        },
        // 资源文件名 css 图片等等
        assetFileNames: (chunkInfo)=>{
          const suffix = chunkInfo.name.split('.').pop()
          if (['css'].includes(suffix)) {
            return `assets/[ext]/assets-[hash].${timestamp}.[ext]`
          } else {
            return `assets/[ext]/[name]-[hash].${timestamp}.[ext]`
          }
        },

        // 块文件名，与下面manualChunks，2选1
        chunkFileNames: (chunkInfo)=>{
          return `assets/js/chunk-[hash].${timestamp}.js`
        }

        // 手动配置块文件名chunk,
        // manualChunks(id, c) {
        //     // 进行分离三方依赖
        //     if (id.includes('node_modules')) {
        //         const name = id.toString().split('node_modules/')[1].split('/')[0]
        //         switch (true) {
        //             // d3的模块(d3-xxx)全部打包进一个文件，名为_d3
        //             case name.startsWith('d3'):
        //                 return '_d3'
        //             // umy的模块(umy-xxx)全部打包进一个文件，名为_umy
        //             case name.startsWith('umy-'):
        //                 return '_umy'
        //             // 以下模块单独打包
        //             case ['vue', 'zrender', 'echarts', 'element-ui', 'xlsx', 'lodash'].includes(name):
        //                 return '_' + name
        //             // 其余的都打包到 '__vendor';
        //             default :
        //                 return '__vendor'
        //         }
        //     }
        // }
      },
      // 插件配置
      plugins: [
        // 打包后删除APP文件夹中的资源
        // deletePlugin({
        //   targets: [
        //     'H5_APP_MUD_REPORT/assets',
        //     'H5_APP_MUD_REPORT/static-assets',
        //     'H5_APP_MUD_REPORT/index.html'
        //   ],
        //   hook: 'generateBundle' // 在打包后的生成阶段删除
        // }),
        // 打包后复制资源
        // copy({
        //   verbose: true,
        //   hook: 'closeBundle',
        //   targets: [
        //     {
        //       src: './dist_mud_app/*', // 源文件路径
        //       dest: 'H5_APP_MUD_REPORT' // 目标文件夹路径
        //     }
        //   ]
        // })
      ]
    },

    // 打包前清空文件，默认true
    emptyOutDir: true
  },
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        tailwindcss,
        // 自适应，px>rem转换
        postCssPxToRem({
          rootValue: 16, // 1rem的大小
          propList: ['*', '!max-width'] // 需要转换的属性，这里排除max-width
        }),
        // 自动添加前缀
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31'
            // "ie >= 8"
            // 'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        sourceMap: true
        // additionalData: `
        // 			@import "./src/assets/scss/scss-components/global.variable.scss";
        // 			@import "./src/assets/scss/scss-components/layout.variable.scss";
        // 			@import "./src/assets/scss/scss-components/mixin.scss";
        // 		`
      }
    }
  }
})
