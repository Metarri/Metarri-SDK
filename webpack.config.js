const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";


const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// const HtmlWebPackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// const assets = [{
//     from: 'assets',
//     to: 'assets'
//   }
// ];


const uglifyWithOptions = new uglifyJsPlugin({
  test: /\.m?(j|t)sx?(\?.*)?$/i,
  sourceMap: isDev,
  extractComments: false,
  cache: false,
  parallel: true,
  uglifyOptions: {
    compress: true,
    mangle: true,
    warnings: false,
    ie8: false,
    output: {
      comments: false,
    },
  }
});


const config = {
  // Where to start bundling
  entry: ".index.ts",

  optimization: {
    minimizer: [
      uglifyWithOptions,
    ],
  },

  // Where to output
  output: {
    // Output to the same directory or use dist child directory
    path: path.resolve(__dirname, 'dist'),  // __dirname
    publicPath: '/',
    // Capture name from the entry using a pattern
    filename: "index.min.js"
  },

  // How to resolve encountered imports
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'ts-loader'
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: "defaults"
                  // targets: "ie 11"
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        } // or we can use awesome-typescript-loader
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/'
          }
        }]
      },
      {
        test: /\.ico?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './'
          }
        }]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },

  // What extra processing to perform
  plugins: [
    // new FaviconsWebpackPlugin('./assets/images/logo.png'),
    // new webpack.DefinePlugin({
    //   SUBDIRECTORY: JSON.stringify(require("./package.json").subdirectory)
    // }),

    // optimization
    uglifyWithOptions,

    // new HtmlWebPackPlugin({
    // template: "./src/index.html",
    // filename: "./index.html"
    // }),

    new CleanWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    // new CopyWebpackPlugin(assets)
  ],

  // Adjust module resolution algorithm
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  devServer: {
    colors: true,
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
    progress: true,
    stats: {
      errorDetails: true,
      cached: false
    }
  }
}

if (isDev) {
  config.devtool = 'inline-source-map';
}


module.exports = config;
