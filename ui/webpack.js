
let webpackConfig = require("./webpack.config.js");
// var config = Object.create(webpackConfig);

let WebpackDevServer = require('webpack-dev-server');
var webpack = require("webpack");

//config.devtool = 'eval';
// config.debug = true;
//
// Start a webpack-dev-server
new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost',
    watchOptions: {
        aggregateTimeout: 30,
        poll: true // is this the same as specifying --watch-poll?
    },
    publicPath: "/public/",
    contentBase: __dirname + "/public/",
    stats: {
        colors: true
    },

}).listen(3000, 'localhost', function (err) {
    if (err) {
        throw err;
    }
    console.log('[webpack-dev-server]', 'http://localhost:3900/webpack-dev-server/index.html');
});