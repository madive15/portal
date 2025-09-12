// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process';

export default defineNuxtConfig({
  $development: undefined,
  devServer: {
    host: '0.0.0.0',
    port: 3100
  },
  app: {
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '법률구조 플랫폼',
      meta: [
        { name: 'description', content: '법률구조 플랫폼 페이지입니다.' },
        {
          name: 'keywords',
          content: '법률구조 플랫폼에서 법률상담을 받아보세요'
        }
      ],
      script: [
        {
          src: '//dapi.kakao.com/v2/maps/sdk.js?appkey=6805619df2ce78e0e8f9e6803478d249&autoload=false'
        },
        {
          src: '//dapi.kakao.com/v2/maps/sdk.js?appkey=6805619df2ce78e0e8f9e6803478d249&autoload=false&libraries=services,clusterer'
        }
      ],
      htmlAttrs: {
        lang: 'ko'
      }
    },
    baseURL: '/',
    keepalive: false
  },
  sourcemap: {
    server: true,
    client: true
  },
  runtimeConfig: {
    public: {
      appName: 'helplaw24.or.kr',
      appBase: process.env.API_BASE || 'http://helplaw24.or.kr'
    }
  },
  ssr: false,
  nitro: {
    static: true,
    preset: 'static'
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: true
    }
  },
  compatibilityDate: '2024-04-03',
  imports: {
    autoImport: true
  },
  devtools: { enabled: true },
  plugins: ['~/plugins/override.ts'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@ant-design-vue/nuxt',
    '@unocss/nuxt',
    '@hebilicious/vue-query-nuxt'
  ],
  vite: {
    server: {
      allowedHosts: true,
      // hmr: {
      //   protocol: 'ws', // 프록시가 https면 'wss'
      //   host: 'dev.helplaw24.go.kr', // 브라우저에서 접근하는 호스트명 (예: dev.helplaw24.go.kr)
      //   port: 3100, // 실제 dev 서버 포트
      //   clientPort: 80 // 브라우저가 접속하는 포트 (Nginx가 80이면 80/443로)
      // }
    },
    optimizeDeps: {
      include: ['ant-design-vue', 'nos', 'nos-common']
    }
  },
  alias: {},
  experimental: {
    payloadExtraction: true
  }
});
