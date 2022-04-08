module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "490px",
      // => @media (min-width: 490px  ) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
    extend: {
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.7)" },
          "80%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        slideInFromRight: {
          "0%": { transform: "translate(50%)", opacity: "0.5" },
          "100%": { transform: "translate(0%)", opacity: "1" },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-75%)", opacity: "0.3" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        slideInFromLeftAbsolute: {
          "0%": { left: "-100%" },
          "100%": { left: "0%" },
        },
        buttonSurprise: {
          "0%": { transform: "scale(0.95)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        modal: "pop 0.3s ease-in-out 1",
        notification: "slideInFromRight 0.25s ease-in-out 1",
        keyboard: "slideInFromLeftAbsolute 0.4s ease-in 1",
        gameScreen: "slideInFromTop 0.3s ease-in 1",
        buttonSurprise: "buttonSurprise 0.3s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
