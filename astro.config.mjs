// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [react(), sitemap(), icon()],

  vite: {
    plugins: [tailwindcss()],
    // Permite abrir el server de desarrollo a través de un túnel (VS Code Port
    // Forwarding o SSH tipo localhost.run). Solo afecta a `astro dev`, no a
    // producción.
    server: {
      allowedHosts: [".devtunnels.ms", ".lhr.life", ".localhost.run"],
    },
  },
});
