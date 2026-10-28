import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "";
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const cuerpo = `User-agent: *\nAllow: /\n\nSitemap: ${base}${basePath}/sitemap.xml\n`;
  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
