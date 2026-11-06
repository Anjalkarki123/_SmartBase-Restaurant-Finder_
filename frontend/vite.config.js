import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,        // SmartBase always runs on this port
    strictPort: true,  // stop with an error if 5180 is busy (instead of switching ports)
    open: true,        // open the browser automatically
    proxy: {
      '/api': { // forward API calls to the Flask backend
         target: 'http://localhost:5000',
         changeOrigin: true,
         rewrite: (path) => {
            if(path.startsWith('/api/')) {
               return path.slice(4);
            }
            return path;
         }
      } 
    },
  },
});
