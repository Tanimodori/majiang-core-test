/// <reference types="node" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'majiangCoreTest',
    },
    minify: false,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
});
