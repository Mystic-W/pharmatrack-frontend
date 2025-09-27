import React, { useEffect, useState } from "react";
import { fetchFillRate, fetchStockouts } from "../lib/api";

export default function Dashboard() {
  const [fill, setFill] = useState<any[]>([]);
  const [stockouts, setStockouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const f = await fetchFillRate();
        setFill(f.rows ?? []);
        const s = await fetchStockouts();
        setStockouts(s.rows ?? []);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard — KPIs</h1>

      {loading && <div>Cargando KPIs...</div>}
      {err && <div className="text-red-600">Error: {err}</div>}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Fill-rate (ejemplo)</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr><th>Fecha</th><th>Distrito</th><th>Fill-rate</th></tr>
            </thead>
            <tbody>
              {fill.slice(0,10).map((r,i)=>(
                <tr key={i} className="border-t">
                  <td className="p-2">{r.dia}</td>
                  <td className="p-2">{r.distrito}</td>
                  <td className="p-2">{(r.fill_rate*100)?.toFixed?.(1) ?? "-" }%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Productos en quiebre (top)</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr><th>Producto</th><th>Días en alerta</th></tr>
            </thead>
            <tbody>
              {stockouts.slice(0,10).map((r,i)=>(
                <tr key={i} className="border-t">
                  <td className="p-2">{r.nombre ?? r.producto}</td>
                  <td className="p-2">{r.dias_en_alerta ?? r.count ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
