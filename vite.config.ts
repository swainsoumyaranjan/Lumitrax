import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

import vitePluginInjectDataLocator from "./plugins/vite-plugin-inject-data-locator";

// Vite configuration for Lumitrax app
export default defineConfig({
  plugins: [
    react(),
    vitePluginInjectDataLocator(),
  ],
  resolve: {
    alias: {
      // Aliasing @lumitrax/react to @heroui/react for rebranding
      "@lumitrax/react": path.resolve(__dirname, "node_modules/@heroui/react"),

      // If you want to rebrand more packages, add aliases like below:
      // "@lumitrax/theme": path.resolve(__dirname, "node_modules/@heroui/theme"),
    },
  },
  server: {
    allowedHosts: true,
  },
});


