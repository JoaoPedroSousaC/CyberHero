import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['cjs'],
  target: 'es2020',
  outDir: 'dist',
  clean: true,
  dts: true,
  exclude: ['src/generated/**'],
})