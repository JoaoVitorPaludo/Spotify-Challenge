/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/main.tsx/**',
        '**/src/styles/global.ts**',
      ],
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/main.tsx/**',
      '**/src/styles/global.ts**',
    ],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Spotify Integration',
        short_name: 'Spotify App',
        description: 'My integration with Spotify',
        theme_color: '#ffffff',
        start_url: 'https://spotify-integration-alpha.vercel.app/callback',
        display: 'standalone',
        background_color: '#ffffff',
        prefer_related_applications: false,
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshot1.png',
            sizes: '1365x767',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/screenshot1.png',
            sizes: '1365x767',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.spotify\.com\/v1\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'spotify-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 dia
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5174,
  },
})
