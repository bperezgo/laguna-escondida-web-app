// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://lagunaescondida.com',
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],

  adapter: node({
    mode: 'standalone',
  }),
});
