import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// src/main.tsx (fragmento)
if (import.meta.env.DEV) {
  // import dinámico para evitar que MSW esté incluido en producción
  import("./mocks/browser")
    .then(({ worker }) => worker.start())
    .catch((e) => {
      // si falla (p. ej. en CI o workers no soportados), lo logueamos para no romper la app
      // eslint-disable-next-line no-console
      console.warn("No se pudo iniciar MSW worker:", e);
    });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
