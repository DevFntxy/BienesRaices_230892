/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors:{
        sesniprymary:{
          DEFAULT: "#006DAA",
          700: "#006DAA"
        },
        sesnisecondary:{
          DEFAULT : "#0353A4",
        },
        sesnitercery:{
          DEFAULT : "#003559",

        }
      },
    },
  },
  plugins: [],
}

