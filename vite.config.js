import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    VitePWA({
      registerType: 'prompt',
      // registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,woff,ttf,woff2,eot}'],
      },
      injectRegister: 'auto',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Agenda',
        short_name: 'Agenda',
        description: 'Agenda',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'agenda192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'agenda512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/agenda/',
  build: {
    outDir: './agenda',
  },
})
