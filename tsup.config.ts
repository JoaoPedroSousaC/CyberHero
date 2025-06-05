import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'node20',
  dts: false,
  shims: false,
  esbuildOptions(options) {
    options.external ||= [];
    options.external.push('./generated/prisma');
  }
});
