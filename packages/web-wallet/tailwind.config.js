module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        wallet: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
};
