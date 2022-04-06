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
        flip: {
          "0%": {
            transform: "rotateY(0deg) scale(1, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "50%": {
            transform: "rotateY(90deg) scale(0, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "100%": {
            transform: "rotateY(180deg) scale(1, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
        },
        // const backgroundColor: Record<string, string> = {
        //   init: "bg-transparent",
        //   success: "bg-green-600",
        //   almost: "bg-yellow-600",
        //   never: "bg-zinc-700",
        // };
        flipNever: {
          "0%": {
            transform: "rotateY(0deg) scale(1, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "50%": {
            transform: "rotateY(90deg) scale(0, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "100%": {
            transform: "rotateY(180deg) scale(1, 1)",
            backgroundColor: "rgb(63 63 70)",
            borderColor: "rgb(63 63 70)",
          },
        },
        flipSuccess: {
          "0%": {
            transform: "rotateY(0deg) scale(1, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "50%": {
            transform: "rotateY(90deg) scale(0, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "100%": {
            transform: "rotateY(180deg) scale(1, 1)",
            backgroundColor: "rgb(22 163 74)",
            borderColor: "rgb(22 163 74)",
          },
        },
        flipAlmost: {
          "0%": {
            transform: "rotateY(0deg) scale(1, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "50%": {
            transform: "rotateY(90deg) scale(0, 1)",
            backgroundColor: "transparent",
            borderColor: "rgb(63 63 70)",
          },
          "100%": {
            transform: "rotateY(180deg) scale(1, 1)",
            backgroundColor: "rgb(202 138 4)",
            borderColor: "rgb(202 138 4)",
          },
        },
        flipReverse: {
          "0%": {
            transform: "rotateY(0deg) scale(1, 1)",
          },
          "50%": {
            transform: "rotateY(-90deg) scale(0, 1)",
          },
          "100%": {
            transform: "rotateY(-180deg) scale(1, 1)",
          },
        },
      },
      animation: {
        modal: "pop 0.2s ease-in-out 1",
        notification: "slideInFromRight 0.25s ease-in-out 1",
        charFlip: "flip 0.5s linear 0.01s 1",
        charFlipNever: "flipNever 0.5s linear 0.01s 1",
        charFlipSuccess: "flipSuccess 0.5s linear 0.01s 1",
        charFlipAlmost: "flipAlmost 0.5s linear 0.01s 1",
        reverseCharFlip: "flipReverse 0.5s linear 0.01s  1",
      },
    },
  },
  plugins: [],
};
