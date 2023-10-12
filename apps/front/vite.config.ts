import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~': '/src',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ['./src/styles/libs'],
            },
        },
    },
    server: {
        proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
          },
        }
    }
});
