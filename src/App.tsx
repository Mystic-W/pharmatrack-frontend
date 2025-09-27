import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">Página no encontrada</h2>
              <p className="mt-4"><Link to="/" className="text-indigo-600 underline">Volver al inicio</Link></p>
            </div>
          }/>
        </Routes>
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm">
        PharmaTrack UI — Demo
      </footer>
    </div>
  );
}
