/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      /* Custom class for DecorativeCounter image component -> Change white for the bg color*/
      backgroundImage: (theme) => ({
        "fade-edge":
          "linear-gradient(to right, white 1%, transparent, white 99%)",
      }),
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
