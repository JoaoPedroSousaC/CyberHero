import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  target: 'node20',
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  outExtension: () => ({ js: '.js' })
});
