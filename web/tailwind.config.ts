import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — black, white & golden yellow
        brand: {
          DEFAULT: '#FFD400',
          50: '#FFFBEB',
          100: '#FFF3C4',
          200: '#FFE985',
          300: '#FFDF47',
          400: '#FFD400',
          500: '#FFC107',
          600: '#E0A800',
          700: '#B38600',
          800: '#806000',
          900: '#4D3A00',
        },
        ink: {
          DEFAULT: '#0B0B0B',
          900: '#0B0B0B',
          800: '#121212',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2E2E2E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(255,212,0,0.16), transparent 60%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD400 0%, #E0A800 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(255,212,0,0.55)',
        card: '0 20px 50px -20px rgba(0,0,0,0.7)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        marquee: 'marquee 30s linear infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.4,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
