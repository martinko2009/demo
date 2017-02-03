process.env.NODE_ENV = "production";
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');
var entries = getEntry('./src/**/*.js');
var chunks = Object.keys(entries);
module.exports = {
	entry:entries,
	output:{
		path:path.resolve(__dirname,"app"),
		filename:"js/[name].[hash].js",
		chunkFilename:"js/[name].[hash].js",
		publicPath:"/app/"
	},
	module:{
		loaders: [
		  {test: /\.vue$/, loader: 'vue' },
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				compact: false,
				cacheDirectory: true
			}
		  },
		  {test: /\.css$/, loader: "style!css" },
		  {test: /\.scss$/, loader: "style!css!sass"},
		  {test: /\.less$/, loader: "style!css!less"},
		  {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'url',
			query: {
				limit: 15000,
				name: 'imgs/[md5:hash].[ext]'
			}
		  },
		  { test: /\.(eot|woff|woff2|svg|ttf)$/, loader: "file-loader" },
		  { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" }
		]
	},
	resolve:{
		root:[process.cwd() + '/src', process.cwd() + '/node_modules', process.cwd() + '/public'],
		extensions: ['', '.js'],
		alias:{
			 configuration: path.resolve(__dirname,"./public/js/configuration.js"),   //
			 jcutils: path.resolve(__dirname,"./public/js/utils.js"),   //
			 dateutilselfmade: path.resolve(__dirname,"./public/js/dateutil.js")   //
		}
	},
	vue: { // 
		loaders: {
		  js: 'babel',
		  css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader')
		}
	},
	plugins:[
            new webpack.ProvidePlugin({
                "$": 'jquery',
                "jQuery": 'jquery',
				"window.$": 'jquery',
                "window.jQuery": 'jquery',
				"Vue": "vue",
				"configuration": "configuration",
				"jcutils": "jcutils"

            }),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendors', // 
				chunks: chunks,  // 
				minChunks: 2 //
			}),
			new webpack.DllReferencePlugin({
				context: __dirname,
				manifest: require('./public/js/dll/manifest/manifest_lib.json'),
			}),
			new ExtractTextPlugin('css/[name].css'),
//			new webpack.optimize.DedupePlugin()
    ],
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	devtool: 'cheap-module-source-map'
};


var prod = process.env.NODE_ENV === 'production';
if (prod) {
//delete module.exports.devtool;
  module.exports.devtool = 'source-map';
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
		warnings:false
	  },
	  mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
	  minimize: true, 
	  output: {comments: false},
	  sourceMap: true
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
}

var pages = getEntry("./src/**/*.html");
for (var pathname in pages) {
  // 
  var conf = {
    filename: './web/' + pathname + '.html', // 
    template: pages[pathname], // 
    inject: true,              // 
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname];
    conf.hash = false;
  }
  // 
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
	var tmpWholeArray = entry.split('/');
	if(tmpWholeArray.length >= 2 && path.extname(entry) == '.js'){
		var libFolder = tmpWholeArray.splice(-2,1);
		if(libFolder != "lib"){
			 var tmp = entry.split('/');
			 var tmp1 = entry.split('/').splice(2, tmp.length-3);
			 pathname = tmp1.join("/") + '/' + basename; // 
			 entries[pathname] = entry;
		}
	}else{
		var tmp = entry.split('/');
		var tmp1 = entry.split('/').splice(2, tmp.length-3);
		pathname = tmp1.join("/") + '/' + basename; // 
		entries[pathname] = entry;
	}
  });
  return entries;
}