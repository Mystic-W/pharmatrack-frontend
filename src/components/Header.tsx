import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-md bg-indigo-600 text-white px-3 py-1 font-semibold">PT</div>
          <div>
            <div className="font-bold">PharmaTrack</div>
            <div className="text-xs text-gray-500">Stock y alertas por zona</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive})=> isActive ? "text-indigo-600 font-medium" : "text-gray-600"}>
            Buscar
          </NavLink>
          <NavLink to="/dashboard" className={({isActive})=> isActive ? "text-indigo-600 font-medium" : "text-gray-600"}>
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
