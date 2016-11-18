module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [ 'test/*Spec.js' ],
    frameworks: [
      'jasmine',
      'sinon'
    ],
    //singleRun: true,
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
              presets: ['airbnb']
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

