/** Antepone la base del sitio (útil si se publica en una subcarpeta). */
export function ruta(p: string): string {
  const base = (import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "");
  return `${base}/${String(p).replace(/^\//, "")}`.replace(/\/{2,}/g, "/");
}

/** Respeta los enlaces externos y aplica la base solo a las rutas internas. */
export function enlace(href: string): string {
  return /^(?:https?:|mailto:|tel:|#|\/\/)/.test(href) ? href : ruta(href);
}

/**
 * Recorre un objeto de datos y antepone la base a las rutas internas
 * (imágenes y enlaces que empiezan por "/").
 */
export function conBase<T>(valor: T): T {
  if (typeof valor === "string") {
    return (valor.startsWith("/") ? ruta(valor) : valor) as T;
  }
  if (Array.isArray(valor)) {
    return valor.map(conBase) as T;
  }
  if (valor && typeof valor === "object") {
    const salida: Record<string, unknown> = {};
    for (const [llave, v] of Object.entries(valor)) salida[llave] = conBase(v);
    return salida as T;
  }
  return valor;
}
