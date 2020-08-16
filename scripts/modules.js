let fs = require("fs");
let path = require("path");
let paths = require("../config/paths.js");
let SCSS = require("./scss.js");
let utils = require("./utils.js");

//Global variables
let log = utils.log;

//Build package modules
let build = function (name, folders) {
    //let bundles = ["elements", "experiments", "form", "grid", "helpers", "layout"];
    let outputFolder = path.join(paths.packages.folder, name, "scss"); //Output folder
    utils.mkdir(outputFolder); //Ensure the folder exists
    return folders.forEach(function (folder) {
        let inputFolder = path.join(paths.src.styles, folder);
        return fs.readdirSync(inputFolder, "utf8").forEach(function (file) {
            if (file === "index.scss" || file.startsWith("_")) {
                return; //Ignore this file
            }
            //Compile this module
            let inputFilePath = path.join(inputFolder, file); //Get inputfile path
            let outputFilePath = path.join(outputFolder, file); //Get output file path
            let scssFile = SCSS.parse(fs.readFileSync(inputFilePath, "utf8"), {
                "resolve": {
                    "../index.scss": "siimple-lib",
                    "./_lib.scss": "./lib.scss"
                },
                "removeNamespaces": false
            });
            //Save this file
            return fs.writeFileSync(outputFilePath, SCSS.stringify(scssFile), "utf8");
        });
    });
};

//Build main and lib bundles
process.nextTick(function () {
    let packages = utils.readJSON(paths.build);
    return Object.keys(packages).forEach(function (key) {
        if (packages[key].modules === null) {
            return null; //No modules to build for this package
        }
        return build(key, packages[key].modules);
    });
});

