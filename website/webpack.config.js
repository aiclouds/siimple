let path = require("path");
let paths = require("../config/paths.js");
let MiniCssExtract = require("mini-css-extract-plugin");
let {getStyleLoaders, getFileLoader} = require("../config/webpack.common.js");

//Build package paths
//let modulesPath = path.resolve(__dirname, "../../node_modules");
let sourcePath = path.resolve(__dirname, "./components");

//Export the webpack configuration
module.exports = function (env) {
    //Export webpack configuration
    return {
        "entry": {
            "icons-explorer": path.join(sourcePath, "IconsExplorer", "index.js"),
        },
        "mode": "production",
        "target": "web",
        "output": {
            "path": path.join(__dirname, "www", "assets"),
            "filename": "[name].js"
        },
        "externals": {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        "resolve": {
            "modules": [paths.packages.folder, paths.modules]
        },
        "module": {
            "rules": [{
                // Parse .scss files only on this module
                "test": /\.scss$/,
                "include": sourcePath,
                "use": getStyleLoaders(["extract", "css:module", "sass"])
            }, {
                // Parse .scss files from other modules
                "test": /\.scss$/,
                "exclude": sourcePath,
                "use": getStyleLoaders(["extract", "css:default", "sass"])
            }, {
                //Parse external css files
                "test": /\.css$/,
                "use": getStyleLoaders(["extract", "css:default"])
            }, {
                // Parse JSX using babel
                // BUT: ignore all .js files in node_modules and bower_components folders
                "test": /\.js$/,
                "include": sourcePath,
                "exclude": /(node_modules|bower_components)/,
                "loader": "babel-loader"
            }]
        },
        "plugins": [
            new MiniCssExtract({"filename": "[name].css"})
        ]
    };
};

