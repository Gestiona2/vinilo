import type { APIRoute } from "astro";

const paginas = ["/", "/productora/", "/portafolio/", "/catalogo/", "/talento/", "/contacto/"];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "";
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const hoy = new Date().toISOString().split("T")[0];
  const urls = paginas
    .map(
      (ruta) => `  <url>
    <loc>${base}${basePath}${ruta === "/" ? "/" : ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${ruta === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${ruta === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
