/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mygrad": 'linear-gradient(90deg, hsla(73, 65%, 34%, 1) 0%, hsla(156, 68%, 88%, 1) 50%, hsla(195, 84%, 41%, 1) 99%)'
        ,
      },
      fontWeight : {
        littleBold : 600
      }
    },
  },
  plugins: [],
}

