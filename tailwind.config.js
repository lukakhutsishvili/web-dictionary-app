/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { oval: "14px", svg: "75px" },
      height: { oval: "14px", svg: "75px" },
      fontFamily: {
        inconsolata: `'Inconsolata', monosp`,
        lora: '"Lora", serif',
        inter: '"Inter", sans-serif',
      },
      fontSize: {
        Base: ["16px", "normal"],
        large: ["64px", "normal"],
      },
      maxWidth: {
        percent: "90%",
      },
      colors: {
        hovervolor: "#A445ED",
        dark: "#050505",
        grey: "#E9E9E9",
        txtgrey: "#757575",
        darkdiv: "#3A3A3A",
        darkinput: "#1F1F1F",
      },
      boxShadow: {
        box: "0px 5px 30px 0px rgba(0, 0, 0, 0.10)",
      },
      padding: {
        large: "350px",
      },
      screens: {
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};
