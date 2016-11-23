module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    files: [ 'test/*Spec.js' ],
    frameworks: [
      'jasmine',
      'sinon'
    ],
    logLevel: 'debug',
    singleRun: false,
    preprocessors: {
      'test/*Spec.js': [ 'webpack' ]
    },
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /\/node_modules\//,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react'],
            }
          }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    }
  });
};

