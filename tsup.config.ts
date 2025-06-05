import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  target: 'node20',
  clean: true,
  sourcemap: true,
  dts: false,
  skipNodeModulesBundle: true,
});
