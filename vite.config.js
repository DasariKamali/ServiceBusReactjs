// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })






import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Change this line

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      nodePolyfills(), // Call the function directly
    ],
    resolve: {
      alias: {
        process: 'process/browser', // Ensure process is resolved to browser version
      },
    },
    define: {
      'import.meta.env.VITE_SERVICE_BUS_CONNECTION_STRING': JSON.stringify(process.env.VITE_SERVICE_BUS_CONNECTION_STRING),
      'import.meta.env.VITE_QUEUE_NAME': JSON.stringify(process.env.VITE_QUEUE_NAME),
      'import.meta.env.VITE_TIMEOUT_IN_MS': JSON.stringify(process.env.VITE_TIMEOUT_IN_MS),
    },
  };
});
