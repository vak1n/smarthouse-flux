const PUBLIC_PATH = require('path').join(__dirname, 'app');

module.exports = {
  entry: {
    index: './app/app.ts'
  },
  output: {
    path: PUBLIC_PATH,
    filename: '[name].js',
  },
  devServer: {
    disableHostCheck: true,
    contentBase: PUBLIC_PATH,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.app.json'  
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
};
