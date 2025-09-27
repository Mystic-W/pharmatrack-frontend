// src/mocks/handlers.ts (MSW v2, versión robusta)
import { http, HttpResponse } from "msw";

/* datos de ejemplo */
const sampleProducts = [
  { _id: "P001", nombre: "Paracetamol 500mg", atc: "N02BE01", presentacion: "Tabletas 10u", rx: false, keywords: ["dolor","fiebre"] },
  { _id: "P002", nombre: "Amoxicilina 500mg", atc: "J01CA04", presentacion: "Cápsulas 10u", rx: true, keywords: ["infección","antibiótico"] },
  { _id: "P003", nombre: "Ibuprofeno 400mg", atc: "M01AE01", presentacion: "Tabletas 10u", rx: false, keywords: ["dolor","inflamación"] },
];

/* helper: normaliza y devuelve un objeto URL (con base fallback) */
function normalizeUrl(req: any): URL {
  // posible ubicaciones de la URL según runtime y version de msw
  const raw =
    req?.url ??
    req?.request?.url ??
    req?.raw?.url ??
    (typeof req === "string" ? req : undefined);

  const base = "http://localhost"; // base fallback para construir URL si viene relativa

  if (!raw) return new URL(base + "/");

  if (raw instanceof URL) return raw;
  if (typeof raw === "string") {
    // si la URL viene completa (https://...) new URL la manejará
    try {
      return new URL(raw);
    } catch {
      // si es relativa, la parseamos con base fallback
      return new URL(raw, base);
    }
  }

  // último recurso: stringify y parsear
  return new URL(String(raw), base);
}

/* helper: extrae :id del path si params no está disponible */
function extractId(req: any) {
  // v2 puede exponer params; si no, fallback al último segmento del pathname
  if (req?.params?.id) return req.params.id;
  const url = normalizeUrl(req);
  const segs = url.pathname.split("/").filter(Boolean);
  return segs.length ? segs[segs.length - 1] : "";
}

export const handlers = [
  http.get("/api/productos", (req) => {
    const url = normalizeUrl(req);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";
    const items = q
      ? sampleProducts.filter((p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p.keywords || []).some((k) => k.includes(q))
        )
      : sampleProducts;
    return HttpResponse.json({ items });
  }),

  http.get("/api/productos/:id", (req) => {
    const id = extractId(req);
    const p = sampleProducts.find((x) => x._id === id) ?? sampleProducts[0];
    return HttpResponse.json(p);
  }),

  http.get("/api/disponibilidad", (req) => {
    const url = normalizeUrl(req);
    const producto = url.searchParams.get("producto") ?? "P001";
    const distrito = url.searchParams.get("distrito") ?? "Cercado";
    const results = [
      { id_sucursal: 1, nombre_sucursal: "Farmacia Centro", distrito, stock_disponible: 12, updated_at: new Date().toISOString() },
      { id_sucursal: 2, nombre_sucursal: "Farmacia Norte", distrito, stock_disponible: 0, updated_at: new Date().toISOString() },
    ];
    // podrías filtrar results por producto/distrito para mayor realismo
    return HttpResponse.json({ results });
  }),

  http.get("/api/kpi/fill-rate", () => {
    const rows = [
      { dia: "2025-09-20", distrito: "Cercado", fill_rate: 0.82 },
      { dia: "2025-09-20", distrito: "Miraflores", fill_rate: 0.91 },
    ];
    return HttpResponse.json({ rows });
  }),

  http.get("/api/kpi/stockout", () => {
    const rows = [
      { nombre: "Amoxicilina 500mg", dias_en_alerta: 5 },
      { nombre: "Insulina R", dias_en_alerta: 3 },
    ];
    return HttpResponse.json({ rows });
  }),
];
