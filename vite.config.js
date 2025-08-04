import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './', // <--- clave para que se mantengan las rutas relativas
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
