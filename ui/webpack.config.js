let webpack = require("webpack");
let JavaScriptObfuscator = require("webpack-obfuscator");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let cssNameFormat = '[name]';

module.exports = {
    context: __dirname + "/frontend",
    mode: "development",
    entry: {
        index : ["./index"]
        // "home": "./js/home",
        // "s_chat": "./js/chat",
        // "g_start": "./js/game/start",
        //"s_common": "./common"
        // Для включения в общую сборку нескольких файлов:
        //  common: ["./common", "./welcom"]
    },
    //extensions: ['.js', '.jsx'],
    output: {
        path: __dirname + "/extension",
        // publicPath: "/",
        filename: "[name].js",
        chunkFilename: '[name].js', //-[chunkhash]
        //Весь модуль будет засунут в переменную window.my_library_name
        //library:  "[name]",
        //Папка для динамической загрузки
        publicPath:  '/extension/'
    },

    watch: true,    //Автообновление

     //Для отладки
    //devtool: "source-map",

    plugins: [
        //--Для webpack-dev-server и горячей перезагрузки
        // new webpack.HotModuleReplacementPlugin(),

        //--Переменные окружения
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        //--Файлы не создаются, если в них есть ошибки
        new webpack.NoEmitOnErrorsPlugin(),

        //--Создает css файл index.js
        // new ExtractTextPlugin(`${cssNameFormat}.css`),

        //--Подключаем jquery (для bootstrap)
        //  чтобы в любом месте сразу писать через $
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.Tether": 'tether',
            Tether: 'tether'
        }),

        //new webpack.optimize.CommonsChunkPlugin({name: 'main', async: true}),

        //--Убирает комментарии и сжимает css
        /*new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),

        //--Выделяем общую часть из всех модулей
         new webpack.optimize.CommonsChunkPlugin({
         name: "s_common",
         chunks: ["home", "chat"],
         minChunks: 2 //Т.е. берем общий код не из всех а хотябы из 2х
         }),
        */

         //--Делаем обустификацию кода
         // new JavaScriptObfuscator({
         //    rotateUnicodeArray: false
         // })

    ],

    //ES7(ES2016) to ES6(ES2015)
    module: {
        // noParse: [/.*(pixi\.js).*/],
        rules: [
            {   test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [
                            'transform-object-rest-spread',
                            // 'async-to-promises'
                        ]
                    }
                }],
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: [{loader: 'url-loader'}]
            },
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            //     use: [{loader: 'url-loader?limit=100000'}]
            // },
            /*{
                test: /\.scss$/,

                use : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap',
                        // 'url-loader?limit=100000',
                        // 'resolve-url-loader',
                        'sass-loader?sourceMap'
                    ]
                })

            },
            {
                test: /\.png$/,
                use: 'file-loader'
            }
            */

            // {
            //     test: /\.json$/,
            //     use: [{
            //         loader: "json"
            //     }]
            // },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
                // use: [{
                //     loader: ExtractTextPlugin.extract({
                //         fallbackLoader: "style-loader",
                //         loader: "css-loader!sass-loader"
                //     })
                // }]
                //
                // loaders: ExtractTextPlugin.extract('style', 'css', 'postcss', 'sass')
            // }
        ]
    }
}
