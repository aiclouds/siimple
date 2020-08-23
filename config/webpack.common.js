let paths = require("./paths.js");
let MiniCssExtract = require("mini-css-extract-plugin");

//Common loaders configuration
let styleLoaders = {
    // Extract CSS styles to a separate .css file
    "extract": {
        "loader": MiniCssExtract.loader,
        "options": {
            "publicPath": "./"
        }
    },
    // sass loader
    "sass": {
        "loader": "sass-loader",
        "options": {
            "sassOptions": {
                "includePaths": [paths.packages.folder]
            },
            "implementation": require("sass")
        }
    },
    // Common CSS loader for parsing .css and compiled .scss files
    "css:default": {
        "loader": "css-loader"
    },
    "css:module": {
        "loader": "css-loader",
        "options": {
            "modules": {
                "mode": "local",
                "localIdentName": "siimple__[hash:base64:10]"
            }
        }
    }
};

//Get style loaders method
module.exports.getStyleLoaders = function (loadersList) {
    if (typeof loadersList === "string") {
        return styleLoaders[loadersList]; //Return only one loader
    }
    //Return a list of loaders
    return loadersList.map(function (name) {
        return styleLoaders[name]; //Get style loader
    });
};

//Get a file loader
module.exports.getFileLoader = function (options) {
    return Object.assign({
        "loader": "file-loader",
        "options": Object.assign(options, {
            "name": "[hash].[ext]"
        })
    });
};


