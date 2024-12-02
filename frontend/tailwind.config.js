

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
        "brad": 'linear-gradient(90deg, hsla(340, 100%, 58%, 1) 0%, hsla(266, 74%, 55%, 1) 100%, hsla(340, 100%, 58%, 1))',
        "editor-grad": "linear-gradient(90deg, hsla(42, 100%, 91%, 1) 0%, hsla(23, 66%, 71%, 1) 100%)",
      },
      boxShadow: {
        "myshad": "-27px 34px 91px 0px rgba(0,0,0,0.1)"
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: "0.2rem",
              marginBottom: "0.2rem",
              fontSize: "0.95rem",

              "@media (min-width: 1024px)": {
                fontSize: "1.1rem", // Even larger font size for screens above 768px
              },
            },
            h2: {
              fontSize: "1.5rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "1.333",
            },
            h3: {
              fontSize: "1.25rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "1.6",
            },
            pre: {
              fontSize: "0.7em", // 14px / 16px
              lineHeight: "1.714", // 24 / 14
              marginTop: "0em", // 24px / 14px
              marginBottom: "0.5em", // 24px / 14px
              borderRadius: "0.375rem", // 6px / 16px
              paddingTop: "0.857em", // 12px / 14px
              paddingInlineEnd: "1.143em", // 16px / 14px
              paddingBottom: "0.857em", // 12px / 14px
              paddingInlineStart: "1.143em", // 16px / 14px
            },
            hr: {
              marginTop: "0.5rem",
              marginBottom: "0.2rem",
              '--tw-prose-hr': "black"
            },
            '--tw-prose-bullets': "black",
            '--tw-prose-counters': "black",
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

