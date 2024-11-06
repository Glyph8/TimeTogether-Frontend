// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// }) // 이건 원래코드

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // host: "0.0.0.0",
    port: 8080, // 원하는 포트 번호로 변경
  },
});
//192.168.86.49
