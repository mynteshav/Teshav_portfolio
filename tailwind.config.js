/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#05070B',
          900: '#080C14',
          850: '#0C111D',
          800: '#111726',
          750: '#161F33',
          700: '#1D2840',
        },
        accent: {
          blue: '#38BDF8',
          electric: '#2563EB',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          purple: '#A855F7',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neural-pattern': 'radial-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15), rgba(56, 189, 248, 0.05) 50%, transparent 80%)',
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-subtle': '0 0 35px -10px rgba(99, 102, 241, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
