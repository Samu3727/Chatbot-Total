import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.*', 'src/**/__tests__/**'],
    setupFiles: ['src/setupTests.ts'],
  },
});
