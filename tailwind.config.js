module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: 'rgba(95, 95, 95, 1)',
        secondary: 'rgba(250, 250, 250, 1)',
        rgba: {
          gray: {
            3: 'rgba(229, 229, 229, 0.3)',
          },
        },
        gray: {
          60: '#F0F3F9',
          70: 'F3F3F3',
          150: '#EAEAEA',
        },
        var: {
          'main-7': 'var(--main-text-color-opacity-7, rgba(95, 95, 95, 0.7))',
          'main-10': 'var(--main-text-color, rgb(95, 95, 95))',
        },
      },
      lineHeight: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: ['./index.html', './src/**/*.{ts,tsx}'],
};
