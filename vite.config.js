import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    // https: true,
    // allowedHosts: [
    //   "43c3-2405-201-600a-7835-12e-b918-9d4-de54.ngrok-free.app", // Add your ngrok domain here
    // ],
  },
});
