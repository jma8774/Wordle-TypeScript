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
          "0%": { transform: "scale(70%)" },
          "80%": { transform: "scale(110%)" },
          "100%": { transform: "scale(100%)" },
        },
        slideInFromRight: {
          "0%": { transform: "translate(50%)", opacity: "0.5" },
          "100%": { transform: "translate(0%)", opacity: "1" },
        },
      },
      animation: {
        modal: "pop 0.2s ease-in-out 1",
        notification: "slideInFromRight 0.25s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
