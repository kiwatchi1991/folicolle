const mix = require("laravel-mix");
require("laravel-mix-react-css-modules");

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.scss/,
                enforce: "pre",
                loader: "import-glob-loader",
            },
            {
                enforce: "pre",
                exclude: /node_modules/,
                loader: "eslint-loader",
                test: /\.(js|jsx)?$/,
                options: {
                    fix: true,
                    cache: false,
                },
            },
        ],
    },
});
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

mix.ts("resources/js/app.tsx", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .reactCSSModules("[name]___[hash:base64]")
    .sourceMaps()
    .browserSync({
        // ここから
        https: false, // httpsのサイトをproxyするならtrueをセット
        files: ["./resources/**/*", "./app/**/*", "./config/**/*", "./routes/**/*", "./public/**/*"],
        proxy: {
            target: "http://127.0.0.1:8000", // 最後に/は不要
        },
        open: true, // BrowserSync起動時にブラウザを開かない
        reloadOnRestart: true, // BrowserSync起動時にブラウザにリロード命令おくる
    });
