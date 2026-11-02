/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Primary teal — calm, professional, eye-friendly
        brand: {
          50: '#f0fbf9',
          100: '#d9f5ef',
          200: '#b3eae0',
          300: '#80d8c9',
          400: '#4cbeb0',
          500: '#2ba396',
          600: '#1f8378',
          700: '#1c6a61',
          800: '#1a534d',
          900: '#174541',
          950: '#0a2724',
        },
        // Soft accent green
        accent: {
          50: '#f1fbf4',
          100: '#dff5e6',
          200: '#bfe9cc',
          300: '#8fd6a4',
          400: '#5cbd78',
          500: '#39a35a',
          600: '#2a8346',
          700: '#246a3a',
          800: '#205431',
          900: '#1b4629',
        },
        // Warm neutral — sand / off-white
        sand: {
          50: '#fcfbf7',
          100: '#f7f4ea',
          200: '#ede5d2',
          300: '#ddccab',
          400: '#c8b07e',
        },
        // Status
        success: '#2ba35a',
        warning: '#e0a32b',
        danger: '#dc4d5a',
        info: '#3c93c9',
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(15, 42, 39, 0.06), 0 1px 4px -1px rgba(15, 42, 39, 0.04)',
        'card': '0 1px 3px rgba(15, 42, 39, 0.05), 0 8px 24px -8px rgba(15, 42, 39, 0.08)',
        'lift': '0 4px 24px -4px rgba(15, 42, 39, 0.12), 0 2px 8px -2px rgba(15, 42, 39, 0.06)',
        'glow': '0 0 0 4px rgba(43, 163, 150, 0.15)',
      },
      borderRadius: {
        'xl2': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 1.6s infinite linear',
        'pulse-soft': 'pulseSoft 2.4s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { '0%': { opacity: 0, transform: 'translateX(-8px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: 0, transform: 'scale(0.96)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-800px 0' }, '100%': { backgroundPosition: '800px 0' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(43,163,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,163,150,0.05) 1px, transparent 1px)',
        'shimmer-grad': 'linear-gradient(90deg, #f5f5f4 0px, #ebebe9 400px, #f5f5f4 800px)',
      },
    },
  },
  plugins: [],
}
