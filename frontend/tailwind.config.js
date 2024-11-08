import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mygrad": 'linear-gradient(90deg, hsla(73, 65%, 34%, 1) 0%, hsla(156, 68%, 88%, 1) 50%, hsla(195, 84%, 41%, 1) 99%)',
        "brad": 'linear-gradient(90deg, hsla(340, 100%, 58%, 1) 0%, hsla(266, 74%, 55%, 1) 100%, hsla(340, 100%, 58%, 1))'
      },
      keyframes: {       
        clockHand : {
          '0%' : {transform : 'rotate(0%)'},
          '100%' : { transform : 'rotate(360%)'}
        }
      },
      animation: {
        clockHand: 'clockHand 6s ease-in-out infinite',
      },
      fontWeight: {
        littleBold: 600
      }
    },
  },
  plugins: [],
}

