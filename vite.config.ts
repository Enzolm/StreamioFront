import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
