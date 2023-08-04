import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    coverage: {
      all: true,
      provider: 'istanbul', // not constantinople
      reporter: ['text', 'json-summary', 'json'],
      include: ['src/**/*.ts', 'src/**/*.vue'],
    },
    environment: 'jsdom',
  },
});
