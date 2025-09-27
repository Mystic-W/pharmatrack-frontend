/* cliente API ligero */
const BASE = (import.meta.env.VITE_API_BASE as string) || "/api";

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

export type Availability = {
  id_sucursal: number;
  nombre_sucursal: string;
  distrito: string;
  stock_disponible: number;
};

export async function fetchProducts(query?: string) {
  const q = query ? `?q=${encodeURIComponent(query)}` : "";
  return request<{ items: Array<any> }>(`/productos${q}`);
}

export async function fetchProduct(id: string) {
  return request<any>(`/productos/${id}`);
}

export async function checkDisponibilidad(producto: string, distrito?: string) {
  const q = `?producto=${encodeURIComponent(producto)}${distrito ? `&distrito=${encodeURIComponent(distrito)}` : ""}`;
  return request<{ results: Availability[] }>(`/disponibilidad${q}`);
}

export async function fetchFillRate(desde?: string, hasta?: string) {
  const q = `?desde=${encodeURIComponent(desde ?? "")}&hasta=${encodeURIComponent(hasta ?? "")}`;
  return request<{ rows: any[] }>(`/kpi/fill-rate${q}`);
}

export async function fetchStockouts(desde?: string, hasta?: string) {
  const q = `?desde=${encodeURIComponent(desde ?? "")}&hasta=${encodeURIComponent(hasta ?? "")}`;
  return request<{ rows: any[] }>(`/kpi/stockout${q}`);
}
