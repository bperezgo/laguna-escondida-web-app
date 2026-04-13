import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/f/celebraciones',
  output: 'static',
  site: 'https://lagunaescondida.com.co',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
