export function currency(n?: number) {
  if (n == null) return "-";
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(n);
}

export function shortDate(s?: string|Date) {
  if (!s) return "-";
  const d = new Date(s);
  return d.toLocaleDateString("es-PE");
}
