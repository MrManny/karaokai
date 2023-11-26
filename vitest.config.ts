import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    coverage: {
      all: true,
      provider: 'istanbul', // not constantinople
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],

      lines: 60,
      branches: 60,
      statements: 60,
      functions: 60,
    },
    environment: 'happy-dom',
  },
});
