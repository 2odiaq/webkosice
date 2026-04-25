import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0b",
          soft: "#101013",
          elev: "#16161a",
        },
        ink: {
          DEFAULT: "#e7e7ea",
          muted: "#a0a0a8",
          dim: "#6b6b74",
        },
        border: {
          DEFAULT: "#1f1f24",
          strong: "#2a2a31",
        },
        accent: {
          DEFAULT: "#22d3ee",
          soft: "#67e8f9",
          glow: "#22d3ee",
        },
        accent2: {
          DEFAULT: "#34d399",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 211, 238, 0.35), 0 0 24px -4px rgba(34, 211, 238, 0.35)",
        "glow-soft":
          "0 0 0 1px rgba(34, 211, 238, 0.2), 0 0 32px -8px rgba(34, 211, 238, 0.25)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(60% 50% at 50% 0%, rgba(34, 211, 238, 0.12), rgba(10,10,11,0) 70%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "glow-pulse-strong": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "33%": { transform: "translate(22px, -14px)" },
          "66%": { transform: "translate(-16px, 18px)" },
        },
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "caret-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-4deg)" },
          "75%": { transform: "rotate(4deg)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-180%) skewX(-12deg)" },
          "100%": { transform: "translateX(260%) skewX(-12deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "marching-ants": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 32px" },
        },
        "wave-flag": {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "glow-pulse-strong": "glow-pulse-strong 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
        "gradient-pan": "gradient-pan 10s ease-in-out infinite",
        "border-spin": "border-spin 6s linear infinite",
        "caret-blink": "caret-blink 1s steps(2) infinite",
        wiggle: "wiggle 0.8s ease-in-out",
        bob: "bob 3s ease-in-out infinite",
        "shine-sweep": "shine-sweep 1.4s ease-in-out",
        "scan-line": "scan-line 2.4s linear infinite",
        "marching-ants": "marching-ants 1.2s linear infinite",
        "wave-flag": "wave-flag 2.8s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
