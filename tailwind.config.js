/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2d7a2e",
          secondary: "#dea523",
          accent: "#00d900",
          neutral: "#070707",
          "base-100": "#fffef8",
          info: "#0071cb",
          success: "#00c896",
          warning: "#ad6000",
          error: "#e1505f",
        },
      },
    ],
  },
  plugins: [daisyui],
};
