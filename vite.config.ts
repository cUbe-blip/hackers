import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~API': path.resolve(__dirname, './src/API'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~constant': path.resolve(__dirname, './src/Constant'),
      '~pages': path.resolve(__dirname, './src/components/Pages'),
      '~ui': path.resolve(__dirname, './src/components/UI'),
    },
  },
});
