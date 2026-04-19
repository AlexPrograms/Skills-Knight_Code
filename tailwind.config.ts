export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: { 950: '#06040f', 900: '#0d0b1e', 800: '#141228', 700: '#1c1935', 600: '#8b8aab', 500: '#312e55' },
        gold: { 300: '#fde68a', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 900: '#451a03' },
        violet: { 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6' },
        rose: { 400: '#fb7185', 500: '#f43f5e' },
        skill: {
          science: '#22d3ee', technology: '#a78bfa', creative: '#f472b6',
          humanities: '#fb923c', languages: '#34d399', social: '#60a5fa',
          sport: '#facc15', practical: '#a3e635',
        },
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulse_gold: { '0%,100%': { boxShadow: '0 0 8px #f59e0b44' }, '50%': { boxShadow: '0 0 24px #f59e0baa' } },
        spin_slow: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        twinkle: { '0%,100%': { opacity: '0.2' }, '50%': { opacity: '1' } },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        pulse_gold: 'pulse_gold 2s ease-in-out infinite',
        spin_slow: 'spin_slow 12s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
}
