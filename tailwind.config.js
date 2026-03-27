module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        partyPink: "#FFAFCC",
        partyBlue: "#A2D2FF",
        partyYellow: "#FFE59D",
        partyPeach: "#FFC8A2",
        ink: "#2B2D42"
      },
      boxShadow: {
        glow: "0 0 24px rgba(255, 175, 204, 0.65)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(255, 175, 204, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(255, 175, 204, 0.8)" }
        }
      },
      animation: {
        floaty: "floaty 3s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
