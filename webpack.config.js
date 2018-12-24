const path = require('path');

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
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    devtool:isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer:{
      contentBase: path.join(__dirname,'public'),
      historyApiFallback: true
    }
  };
};