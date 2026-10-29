import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({
  mode
}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
      port: 3000,
      host: '127.0.0.1',
      // Database and upload writes must never trigger browser reloads.
      watch: { ignored: ['**/server/data/**', '**/server/uploads/**'] },
      proxy: Object.fromEntries(['/api', '/uploads'].map(prefix => [prefix, {
        target: env.API_PROXY_TARGET || 'http://127.0.0.1:3001',
        changeOrigin: true
      }]))
    }
  };
});
