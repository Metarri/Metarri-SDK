const webpack = require("webpack");

const PORT = 9000;

const HAS_SOURCE_MAP = String(process.env.HAS_SOURCE_MAP) === 'true' ? true : false;

const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const uglifyWithOptions = new uglifyJsPlugin({
  test: /\.m?(j|t)s(\?.*)?$/i,
  sourceMap: HAS_SOURCE_MAP,
  extractComments: false,
  cache: true,
  parallel: true,
  uglifyOptions: {
    compress: !HAS_SOURCE_MAP,
    mangle: !HAS_SOURCE_MAP,
    warnings: false,
    ie8: false,
    output: {
      comments: false,
    },
  }
});


const payload = {
  // Where to start bundling
  entry: "./src/index.ts",

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
    filename: "index.js"
  },

  // How to resolve encountered imports
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // Begin: babel-loader
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
                  // targets: "defaults"
                  targets: "ie 11"
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        } // or we can use awesome-typescript-loader
      },
      // End: babel-loader

      // Begin: esbuild-loader
      // {
      //   // test: /\.js$/,
      //   test: /\.(ts|tsx|js|jsx)$/,
      //   loader: 'esbuild-loader',
      //   options: {
      //     loader: 'tsx',
      //     target: 'es2015',
      //     tsconfigRaw: require('./tsconfig.json')
      //   }
      // },
      // End: esbuild-loader

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'assets/fonts/'
      //     }
      //   }]
      // },

      // {
      //   test: /\.ico?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: './'
      //     }
      //   }]
      // },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },

  // What extra processing to perform
  plugins: [

    // optimization
    uglifyWithOptions,

    new Dotenv({
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    }),

    new CleanWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    // new CopyWebpackPlugin(assets)
  ],

  // Adjust module resolution algorithm
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  // devServer: {
  //   colors: true,
  //   contentBase: './dist',
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   port: 3000,
  //   progress: true,
  //   stats: {
  //     cached: true
  //   }
  // }
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: PORT,
  },
};


if (HAS_SOURCE_MAP) {
  payload.devtool = 'inline-source-map';
}

console.log(`Serving at: http://127.0.0.1:${PORT}/metarri-sdk.min.js`);


module.exports = payload;