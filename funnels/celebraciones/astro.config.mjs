import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/f/celebraciones',
  output: 'static',
  site: 'https://lagunaescondida.com.co',
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
