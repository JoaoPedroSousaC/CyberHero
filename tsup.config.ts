import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'node20',
  format: ['cjs'],
  dts: true,
  exclude: ['src/generated/**/*', '**/*.prisma', '**/*.d.ts', '**/*.node'],
});
