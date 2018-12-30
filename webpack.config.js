const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
  const isProduction = (env === 'production');
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname,'public'),
      filename: 'bundle.js'
    },
    mode: 'none',
    module: {
      rules: [
        {
          //Runs babel for all JS files except node_modules
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader:"sass-loader",
              options:{
                sourceMap : true
              }
            }
          ]
        }
      ]
    },
    // optimization: {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       cache: true,
    //       parallel: true,
    //       sourceMap: true // set to true if you want JS source maps
    //     }),
    //     new OptimizeCSSAssetsPlugin({})
    //   ]
    // },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    devtool:isProduction ? 'source-map' : 'inline-source-map',
    devServer:{
      contentBase: path.join(__dirname,'public'),
      historyApiFallback: true
    }
  };
};