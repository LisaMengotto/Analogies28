import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ IMPORTANT for custom domain (analogies28.com)
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
