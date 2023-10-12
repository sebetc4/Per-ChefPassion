import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';


console.log(path.resolve(__dirname, 'test/setup.ts'))
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'test/setup.ts')],
    env: {
      IS_REACT_ACT_ENVIRONMENT: 'true',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});