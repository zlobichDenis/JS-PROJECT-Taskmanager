const path = require(`path`);


module.exports = {
    target: `node`,
    mode: `development`,
    entry: `./src/main.js`,
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, `./public`),
    },
    devtool: `source-map`
};