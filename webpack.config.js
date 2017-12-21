var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var TransferWebpackPlugin = require('transfer-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  entry:{
      'testProject/test/testApp': ['./src/app/testApp.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    },{
      test: /\.(gif|jpg|png|woff|svg|eot|ttf).*$/,
      loader: 'url-loader?limit=90000&name=[path][name].[ext]'
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader","css-loader")
    }]
  },
  devServer: {
    disableHostCheck: true
  },
  resolve: {
    extensions:['','.js','.json'],
    alias: {
      tool:  path.resolve(__dirname, "src/tool/tool")
    }
  },
  plugins: [
    new ExtractTextPlugin('[name].min.css'),
    new CopyWebpackPlugin([
      {from: './src/images/favicon.ico',to: './' },
      {from: './src/constants/ypConfig.js',to: './' }
    ]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      tool: 'tool'
    })
  ]
};
if(process.env.NODE_ENV === 'production') {
  var uglifyJsPlugin=new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  });
  config.plugins.push(uglifyJsPlugin);
}

var templateArr=[
  {FolderName:'test',title:'',app:'testProject/test/testApp'}
];

templateArr.map(
    (templateJson) =>{
      var htmlWebpackPlugin=new HtmlWebpackPlugin({
        title: templateJson.title,
        filename: 'testProject/'+templateJson.FolderName+'/'+templateJson.FolderName+'.html',
        template: './src/template/'+templateJson.FolderName+'/'+templateJson.FolderName+'.ejs',
        inject: 'body',
        hash: true,
        minify: {removeComments:true,collapseWhitespace:true},
        chunks: [templateJson.app],
      })
      config.plugins.push(htmlWebpackPlugin);
    }
)

module.exports = config;


