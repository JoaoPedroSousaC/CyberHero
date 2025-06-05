import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  target: 'es2020',
  format: ['cjs'],
  splitting: false,
  clean: true,
  dts: true,
});