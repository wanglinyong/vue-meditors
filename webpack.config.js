var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // entry: './src/index.js',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),//'./build'
    publicPath: '/dist/',//'/build/
    filename: 'build.js',//index.js
    libraryTarget: 'umd',
    library: 'markdown-vue',
    umdNamedDefine: true
  },
  devtool: NODE_ENV==='develop'?'cheap-module-eval-source-map':'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery",
    "window.jQuery": "jquery"
  })
],
/*env: {
  // 原有
  browser: true,
  // 添加
  jquery: true
},*/
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (NODE_ENV === 'production'||NODE_ENV==='npm') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip'
  })
  ])
}
