module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#050816",
          800: "#0B1026",
          700: "#1a1a2e",
          600: "#16213e",
          500: "#0f3460",
        },
        neon: {
          cyan: "#00d4ff",
          purple: "#b833ff",
          pink: "#ff006e",
          blue: "#0066ff",
        },
        glass: "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #050816 0%, #0B1026 100%)",
        "gradient-neon": "linear-gradient(135deg, #b833ff 0%, #00d4ff 50%, #0066ff 100%)",
        "gradient-cyber": "linear-gradient(135deg, #ff006e 0%, #b833ff 50%, #00d4ff 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(184, 51, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)",
        "neon-purple": "0 0 20px rgba(184, 51, 255, 0.5), 0 0 40px rgba(184, 51, 255, 0.3)",
        "neon-pink": "0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)",
        "glass-sm": "0 8px 32px rgba(0, 0, 0, 0.3)",
        "glass-md": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)",
        "glass-lg": "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in": "slide-in 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "shimmer": "shimmer 2s infinite",
        "typing": "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink-caret": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "Roboto", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
