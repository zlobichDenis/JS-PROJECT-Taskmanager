const path = require(`path`);
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');



module.exports = {
    target: `node`,
    mode: `development`,
    entry: `./src/main.js`,
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, `./public`),
    },
    devtool: `source-map`,
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['es-us'],
        }),
    ],
    module:{
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};