// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: `${import.meta.env.VITE_API_URL}`, // Replace with your backend URL
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// })
// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd());

//   return {
//     plugins: [tailwindcss(), react()],
//     server: {
//       host: '0.0.0.0',
//       port: parseInt(process.env.PORT) || 5173,
//       proxy: {
//         '/api': {
//           target: env.VITE_API_URL, 
//           changeOrigin: true,
//           secure: false,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       },
//     },
//   };
// });

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [tailwindcss(), react()],
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT) || 5173,
      proxy: {
        '/api': {
          //target: env.VITE_API_URL,
          target:"https://digicare-backend.onrender.com",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT) || 4173,
    }
  };
});

