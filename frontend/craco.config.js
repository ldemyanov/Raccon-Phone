const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@tools': path.resolve(__dirname, 'src/tools'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
    },
  },
};
