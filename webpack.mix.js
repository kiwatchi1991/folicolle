const mix = require('laravel-mix');

mix.webpackConfig({
    module: {
        rules: [{
            test: /\.scss/,
            enforce: 'pre',
            loader: 'import-glob-loader'
        }]
    }
})
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .browserSync({ // ここから
        https: false, // httpsのサイトをproxyするならtrueをセット
        files: [ // チェックするファイルは下記で十分ではないかな。
            './resources/**/*',
            './app/**/*',
            './config/**/*',
            './routes/**/*',
            './public/**/*'
        ],
        proxy: {
            target: 'http://127.0.0.1:8000' // 最後に/は不要
        },
        open: true, //BrowserSync起動時にブラウザを開かない
        reloadOnRestart: true //BrowserSync起動時にブラウザにリロード命令おくる
    });
