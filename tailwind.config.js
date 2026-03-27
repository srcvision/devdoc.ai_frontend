/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── devdoc.ai Brand Palette ───────────────────────
        // red (#FB3640)  — primary background, hero sections, CTAs
        // ink (#000F08)  — primary text, buttons on red, navbar
        // white          — cards, form backgrounds, contrast panels
        red: {
          brand:  '#FB3640',
          dark:   '#D62B34',
          deeper: '#B5222A',
          light:  '#FD6168',
          muted:  'rgba(251,54,64,0.12)',
          glass:  'rgba(251,54,64,0.07)',
        },
        ink: {
          DEFAULT: '#000F08',
          soft:    '#1a1f1e',
          muted:   '#2d3530',
          light:   '#4a5550',
        },
        // Keep for dashboard backward compat
        brand: {
          50:  '#fff0f0', 100: '#ffd9da', 200: '#ffb3b5',
          300: '#fd8d90', 400: '#fc666a', 500: '#FB3640',
          600: '#D62B34', 700: '#B5222A', 800: '#8a1920', 900: '#5e1016',
        },
        surface: {
          50:  '#fef8f8', 100: '#fee0e1',
          800: '#1a0a0b', 900: '#110607', 950: '#000F08',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.35s ease-out both',
        'slide-up':   'slideUp 0.4s ease-out both',
        'slide-in':   'slideIn 0.3s ease-out both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':  'spin 3s linear infinite',
        'glow':       'glow 2.5s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
        'ticker':     'ticker 20s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(22px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-14px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        glow:    { '0%,100%': { boxShadow: '0 0 8px rgba(251,54,64,0.3)' }, '50%': { boxShadow: '0 0 30px rgba(251,54,64,0.7)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        ticker:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      backgroundImage: {
        'grid-ink':   "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgba(0,15,8,0.08)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-light': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgba(255,255,255,0.06)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
      },
      boxShadow: {
        'red-sm':  '0 2px 12px rgba(251,54,64,0.20)',
        'red-md':  '0 4px 24px rgba(251,54,64,0.30)',
        'red-lg':  '0 8px 40px rgba(251,54,64,0.40)',
        'ink-sm':  '0 2px 12px rgba(0,15,8,0.12)',
        'card':    '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
