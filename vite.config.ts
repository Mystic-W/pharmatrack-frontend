import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // no pongas `root` ni `base` para dev; si antes tenías base distinta, coméntala
});
