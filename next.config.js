
const path = require('path')
const glob = require('glob')

module.exports = {
  webpack: (config, { dev }) => {
    if(dev)
      config.module.rules.push(
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: "eslint-loader",
        })

    config.module.rules.push(
      {
        test: /\.(css|styl)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'babel-loader',
          'next-style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          'stylus-loader'

        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }

    )

    return config
  }
}
