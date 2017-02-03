var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var entries = ['jquery','layer-dialog',"vue","bootstrap/dist/js/bootstrap.min.js","jquery-ui","images-preview","imagebox"];
//var entries = ['jquery','layer-dialog',"vue","bootstrap/dist/js/bootstrap.min.js","images-preview","imagebox"];
var jqueryUiWidgets = [];
glob.sync("../../../node_modules/jquery-ui/ui/widgets/*.js").forEach(function (entry) {
	var basename = path.basename(entry);
	jqueryUiWidgets.push("jquery-ui/ui/widgets/"+basename);
});
entries = entries.concat(jqueryUiWidgets);
var commonentries = [
//	'../custom_directive.js',
	'../dateutil.js',
	'../jqalert.js',
	'../jquery.cookie.js',
	'../localstorage.js',
//	'../login.js',
//	'../utils.js',
	'../maskajax/layoutajax.js',
];
entries = entries.concat(commonentries);
module.exports = {
	entry:{
	   "lib":entries
	},
    output: {
        path: 'dist',
        filename: '[name]-min.js',
        library: '[name]',
    },
	resolve:{
		extensions: ['', '.js']
	},
    plugins: [
		new webpack.ProvidePlugin({
                "$": 'jquery',
                "jQuery": 'jquery',
				"window.$": 'jquery',
                "window.jQuery": 'jquery'
        }),
        new webpack.DllPlugin({
            path: path.resolve( __dirname,'../manifest/manifest_[name].json'),
            name: '[name]',
            context: path.resolve(__dirname,"../../../../"),
        }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
		    },
		    mangle: {
				except: ['$super', '$', 'exports', 'require']
		    },
			minimize: true, 
			output: {comments: false} 
		})
    ],
};