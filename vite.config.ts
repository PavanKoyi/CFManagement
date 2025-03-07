import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    commonjsOptions: {
      include: [/canvg/, /html2canvas/, /dompurify/]
    },
    rollupOptions: {
      external: [],
    }
  },
  optimizeDeps: {
    include: ['canvg', 'html2canvas', 'dompurify']
  }
});
