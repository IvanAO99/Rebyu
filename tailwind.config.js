/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      /* Custom class for DecorativeCounter image component -> Change white for the bg color*/
      backgroundImage: (theme) => ({
        "fade-edge-light": `linear-gradient(to right, rgb(249, 250, 251) 1%, transparent, rgb(249, 250, 251) 99%)`,
        "fade-edge-dark": `linear-gradient(to right, rgb(55 65 81 / 1) 1%, transparent, rgb(55 65 81 / 1) 99%)`,
      }),
    },
    // Extiende las utilidades de line-clamp
    lineClamp: {
      5: "5", // Agrega utilidad para 5 líneas
      6: "6", // Agrega utilidad para 6 líneas
      7: "7", // Agrega utilidad para 7 líneas
      8: "8", // Agrega utilidad para 8 líneas
      9: "9", // Agrega utilidad para 9 líneas
      10: "10", // Agrega utilidad para 10 líneas
      11: "11", // Agrega utilidad para 10 líneas
    },
  },
  plugins: [],
};
