import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['cjs'],
  outExtension: () => ({ js: '.js' }),
  target: 'node20',
  clean: true
});
