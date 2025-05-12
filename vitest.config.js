/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,      // Enables 'describe', 'test', etc. without importing them
    environment: 'node' // Optional: use Node test environment
  }
});
