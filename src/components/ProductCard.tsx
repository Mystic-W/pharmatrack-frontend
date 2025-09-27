import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{product.nombre}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.atc ?? "ATC no disponible"}</p>
        <p className="text-xs text-gray-600 mt-2">Presentación: {product.presentacion ?? "N/D"}</p>
        <p className="text-xs text-gray-600 mt-1">Rx: {product.rx ? "Sí" : "No"}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/producto/${product._id}`}
          className="text-indigo-600 underline text-sm"
        >
          Ver disponibilidad
        </Link>
        <div className="text-xs text-gray-500">ID: {product._id}</div>
      </div>
    </article>
  );
};

export default ProductCard;
