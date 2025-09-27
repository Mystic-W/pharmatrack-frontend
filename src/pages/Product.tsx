// src/pages/Product.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, checkDisponibilidad } from "../lib/api";
import { Product } from "../types";
import { shortDate } from "../utils/format";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [avail, setAvail] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const p = await fetchProduct(id);
        setProduct(p);
        const a = await checkDisponibilidad(id);
        setAvail(a.results ?? a); // compatibilidad con distintos mocks
      } catch (e: any) {
        setErr(e.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;
  if (!product) return <div>No se encontró el producto</div>;

  return (
    <div>
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.nombre}</h1>
          <p className="text-sm text-gray-500 mt-1">ATC: {product.atc ?? "N/D"}</p>
          <p className="text-sm text-gray-500 mt-1">Presentación: {product.presentacion ?? "N/D"}</p>
          <p className="text-sm text-gray-500 mt-1">Rx: {product.rx ? "Sí" : "No"}</p>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="font-semibold mb-2">Disponibilidad por sucursal</h2>
        {avail.length === 0 ? (
          <div className="text-gray-500">No hay stock en las sucursales para este producto.</div>
        ) : (
          <table className="w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-2">Sucursal</th>
                <th className="p-2">Distrito</th>
                <th className="p-2">Stock disponible</th>
                <th className="p-2">Última actualización</th>
              </tr>
            </thead>
            <tbody>
              {avail.map((a) => (
                <tr key={a.id_sucursal} className="border-t">
                  <td className="p-2">{a.nombre_sucursal}</td>
                  <td className="p-2">{a.distrito}</td>
                  <td className="p-2 font-medium">{a.stock_disponible}</td>
                  <td className="p-2">{shortDate(a.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
