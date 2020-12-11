/*
  Removes unused css classes from tailwind
*/

module.exports = {
    purge: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
      'public/**/*.html',
    ],
    theme: {
      extend: {
        fontFamily: {
          'Arvo': ['Arvo', 'system-ui'],
          'Montserrat': ['Montserrat', 'ui-serif', 'Georgia'],
        },
      },
    },
    variants: {},
    plugins: [],
  }