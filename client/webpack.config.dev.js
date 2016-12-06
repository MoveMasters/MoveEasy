module.exports = {
  entry: [
    './master/jsx/App.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/dist/',
    filename: 'app.bundle.js',
    sourceMapFilename: "app.bundle.js.map",
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
      loader: 'url?prefix=font/&limit=10000'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  debug: true,
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};


// var path = require('path');
// var webpack = require('webpack');

// module.exports = {
//     entry: [
//         'webpack/hot/dev-server',
//         'webpack-hot-middleware/client',
//         path.resolve(__dirname, 'master/jsx/App')
//     ],
//     output: {
//         path: path.resolve(__dirname, 'build'),
//         publicPath: '/dist/',
//         filename: 'app.bundle.js'
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx']
//     },
//     plugins: [
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoErrorsPlugin()
//     ],
//     devtool: 'inline-source-map',
//     debug: true,
//     devServer: {
//       historyApiFallback: true,
//       contentBase: './'
//     }
//     module: {
//         loaders: [{
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loaders: ['react-hot-loader/webpack']
//         }, {
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loader: 'babel',
//             query: {
//                 presets: ['es2015', 'react'],
//                 compact: false
//             }
//         }, {
//             test: /\.css$/,
//             loader: "style-loader!css-loader"
//         }, {
//             test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
//             loader: 'url?prefix=font/&limit=10000'
//         }]
//     }
// };
