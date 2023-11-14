/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scaleKey: {
          from: {
            transform: 'scale(0)'
          },
          to: {
            transform: 'scale(1)'
          }
        },
        slideToLeft: {
          from: {
            transform: 'translateX(50%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        slideToRight: {
          from: {
            transform: 'translateX(-50%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
      },
      animation: {
        scale: 'scaleKey 1s ease-in-out',
        slideLeft: 'slideToLeft 1s ease-out',
        slideRight: 'slideToRight 1s ease-in',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'chakra-blue': '#0061cc',
        'c-text': 'var(--c-text)',
        'c-1': 'var(--c-1)',
        'c-2': 'var(--c-2)',
        'c-4': 'var(--c-4',
        'c-3': 'var(--c-3)',
        'c-5': 'var(--c-5)',
        'c-6': 'var(--c-6)',
        'c-7': 'var(--c-7)',
      },
      boxShadow: {
        issue: '0 1px 2px 0 #091e4240',
        list: '0 0 2px 0 #091e4230',
      },
    },
  },
  plugins: [],
};
