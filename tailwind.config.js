// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': { color: '#3b82f6' },
          '50%': { color: '#1d4ed8' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
};
