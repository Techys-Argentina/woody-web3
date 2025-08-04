import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'js', dest: '.' },
        { src: 'lib', dest: '.' },
        { src: 'media', dest: '.' }
      ]
    })
  ]
});
