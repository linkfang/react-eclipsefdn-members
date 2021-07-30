// @see https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
require('@craco/craco');

module.exports = {
  babel: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  },
  webpack: {
    configure: {
      resolve: {
        alias: {
          jquery: 'jquery/src/jquery',
        },
      },
    },
  },
};
