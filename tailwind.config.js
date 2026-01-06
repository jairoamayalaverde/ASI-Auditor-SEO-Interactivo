/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Configuramos Roboto como la fuente por defecto para todo el texto (sans)
        sans: ['Roboto', 'sans-serif'],
        // Creamos una utilidad 'font-heading' que usará Raleway
        heading: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
