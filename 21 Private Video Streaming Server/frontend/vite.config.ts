import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // const processEnvValues = {
  //   "process.env": Object.entries(env).reduce((prev, [key, val]) => {
  //     console.log(key, val);
  //     return {
  //       ...prev,
  //       [key]: val,
  //     };
  //   }, {}),
  // };

  return {
    plugins: [react()],
    // define: processEnvValues,
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${env.VITE_BACKEND_PORT}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: `http://localhost:8888/api`,
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
