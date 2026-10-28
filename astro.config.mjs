import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Sitio estático. Los formularios y el checkout de esta demo no tienen
// backend: envían el pedido por WhatsApp. Ver PENDIENTES.md.
//
// Demo: https://demos.emp2web.com/vinilo (GitHub Pages de la organización).
// Para compilar la demo:
//   PUBLIC_SITE=https://demos.emp2web.com PUBLIC_BASE=/vinilo npm run build
// Con dominio propio del cliente:
//   PUBLIC_SITE=https://mdlvinilocol.com PUBLIC_BASE=/ npm run build
export default defineConfig({
  site: process.env.PUBLIC_SITE || "https://mdlvinilocol.com",
  base: process.env.PUBLIC_BASE || "/",
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
