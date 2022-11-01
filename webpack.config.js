const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const package = require('./package.json')
const {parseStringifiedEnv} = require('./build_config/env')

const isProd = process.env.NODE_ENV === 'production'
const distPath = path.join(__dirname, './dist')
const sourcePath = path.join(__dirname, './')
const envPath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)
const mode = isProd ? 'production' : 'development'

module.exports = () => {
  const config = {
    mode,
    context: sourcePath,

    entry: { 
      main: './src/view/index.jsx',
    },
    
    output: {
      path: distPath,
      filename: '[name].js?v=[contenthash]'
    },
  
    optimization: {
      minimize: isProd,
      splitChunks: { 
        chunks: 'all',
        name: 'shared'
      }
    },

    plugins: [
      new webpack.DefinePlugin(parseStringifiedEnv(envPath)),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),
      new HtmlWebpackPlugin({
        template: `./src/view/index.html`,
        publicPath: '/'
      })
    ],

    externals: {
      fs: 'commonjs2 fs'
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      fallback: {
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
        // os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        util: require.resolve('util/'),
        zlib: require.resolve('browserify-zlib'),
        path: require.resolve('path-browserify')
      }
    },
  
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ]
    },
  
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
    },
  }

  if(process.env.ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  if(!isProd) {
    config.devtool = 'inline-source-map'
    config.devServer = {
      static: {
        publicPath: path.resolve(__dirname, './'),
      },
      https: false,
      allowedHosts: 'all',
      historyApiFallback: true,
      port: process.env.PORT,
      compress: true,
      hot: false
    }
  }

  return config
}
