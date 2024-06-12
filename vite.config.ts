import { defineConfig, splitVendorChunkPlugin } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  server: {
    port: 4200,
    host: "memo-recall.internal",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
  preview: {
    port: 4200,
    host: "memo-recall.internal",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
  plugins: [suidPlugin(), solidPlugin(), splitVendorChunkPlugin()],
  base: "/",
  build: {
    target: "esnext",
  },
});
