import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,        // SmartBase always runs on this port
    strictPort: true,  // stop with an error if 5180 is busy (instead of switching ports)
    open: true,        // open the browser automatically
    proxy: {
      '/api': 'http://localhost:5000', // forward API calls to the Flask backend
    },
  },
});
