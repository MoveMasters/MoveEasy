var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    basePath: '',
    frameworks: ['jasmine'],
    singleRun: true,
    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/*Spec.js': ['webpack', 'sourcemap']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps  default
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /\/node_modules\//,
            query: {
              presets: ['es2015', 'react']
            }
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: {
          extensions: ['', '.js', '.jsx']
      }
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher'
    ],
  })
};
