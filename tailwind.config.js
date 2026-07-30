/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        'primary-dark': '#3730a3',
        accent: '#10b981',
        error: '#f43f5e',
        warning: '#f59e0b',
        orange: '#f59e0b',
        background: '#0a0a0b',
        surface: '#1a1a1f',
        'surface-darker': '#121218',
        'surface-hover': '#252530',
        border: '#2d2d35',
        foreground: '#ffffff',
        muted: '#9ca3af',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
