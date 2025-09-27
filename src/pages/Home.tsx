import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../lib/api";
import { Product } from "../types";

export default function Home() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function doSearch(term = q) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetchProducts(term);
      setItems(res.items);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // search inicial
    doSearch("");
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buscar medicamentos</h1>

      <div className="mb-6 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ej. paracetamol, amoxicilina"
          className="flex-1 border rounded p-2"
        />
        <button onClick={() => doSearch()} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </div>

      {loading && <div>Cargando resultados…</div>}
      {err && <div className="text-red-600">Error: {err}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
