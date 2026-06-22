import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Multi-page app: each resume HTML is its own entry point
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'resume-master': resolve(__dirname, 'resume-master.html'),
        'resume-ml-engineer': resolve(__dirname, 'resume-ml-engineer.html'),
        'resume-data-scientist': resolve(__dirname, 'resume-data-scientist.html'),
        'resume-data-analyst': resolve(__dirname, 'resume-data-analyst.html'),
        'resume-ai-engineer': resolve(__dirname, 'resume-ai-engineer.html'),
      }
    }
  }
})
