const webpack = require('webpack');

var config = {
   entry: './gui/main.js',
	
   output: {
      filename: './gui/index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
   plugins: [
      new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'})
   ],
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
            	loader: 'babel-loader',
            	options: {
            		presets: ['react', 'es2015']
            	}
            }
         },

         {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
         },
         {
           test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
           loader: 'url-loader',
           options: {
             limit: 1048576
           }
         }

      ]
   }
}

module.exports = config;