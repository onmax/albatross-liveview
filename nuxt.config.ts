import process from 'node:process'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-31',

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  hub: {
    // NuxtHub options. See https://hub.nuxt.com/docs/getting-started/installation
  },

  devtools: {
    enabled: true,
  },

  colorMode: {
    classSuffix: '',
  },

  runtimeConfig: {
    rpcUrl: process.env.NUXT_RPC_URL,
    albatrossLiveview: {
      privateKey: process.env.NUXT_ALBATROSS_LIVEVIEW_PRIVATE_KEY,
      txRecipient: process.env.NUXT_ALBATROSS_LIVEVIEW_TX_RECIPIENT,
      txValue: process.env.NUXT_ALBATROSS_LIVEVIEW_TX_VALUE,
      txFee: process.env.NUXT_ALBATROSS_LIVEVIEW_TX_FEE,
    },
    public: {
      nimiqNetwork: process.env.NUXT_PUBLIC_NIMIQ_NETWORK,
    },
  },

  routeRules: {
    '/api/policy': { swr: 3600 }, // cache 1 hour
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  vite: {
    plugins: [
      wasm(),
      topLevelAwait(),
    ],
    optimizeDeps: {
      exclude: ['@nimiq/core', '*.wasm'],
    },
  },

  watch: ['server/**/*'],

  nitro: {
    experimental: {
      wasm: true,
      websocket: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      title: 'Nimiq Albatross Liveview',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Your Nimiq-Nuxt Template' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#1f2348' },
      ],
    },
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
