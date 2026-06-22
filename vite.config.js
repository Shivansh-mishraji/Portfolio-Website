import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Multi-page app: each resume HTML is its own entry point
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      manifest: {
        name: 'Shivansh Mishra Portfolio',
        short_name: 'Shivansh',
        theme_color: '#04040f',
        icons: [
          { src: '/profile.webp', sizes: '512x512', type: 'image/webp', purpose: 'any maskable' }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'resume-master': resolve(__dirname, 'resume-master.html'),
        'resume-ml-engineer': resolve(__dirname, 'resume-ml-engineer.html'),
        'resume-data-scientist': resolve(__dirname, 'resume-data-scientist.html'),
        'resume-data-analyst': resolve(__dirname, 'resume-data-analyst.html'),
        'resume-ai-engineer': resolve(__dirname, 'resume-ai-engineer.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
        }
      }
    }
  }
})
