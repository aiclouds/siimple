let fs = require("fs");
let path = require("path");
let paths = require("../config/paths.js");
let SCSS = require("./scss.js");
let utils = require("./utils.js");

//Global variables
let endl = "\n";
let log = utils.log;

//Build bundle
let buildBundle = function (files, options) {
    let bundle = {"content": "", "modules": {}, "header": null}; //Output bundle
    //Process all files in the list
    files.forEach(function (filePath) {
        let file = SCSS.parse(fs.readFileSync(filePath, "utf8"), options);
        bundle.content = bundle.content + endl + file.metadata + endl + file.content + endl;; 
        //Parse modules
        return file.modules.forEach(function (m) {
            if (m.isLocal === true) {
                return null; //This is not a global module --> ignore
            }
            //Check if this module is in the current list
            if (typeof bundle.modules[m.name] !== "undefined") {
                if (bundle.modules[m.name].as !== m.as) {
                    //Different as attributes ---> throw error and abort
                    return log.error(`Different modules renamed for module '${m.name}': '${bundle.modules[m.name].as}' !== '${m.as}'`);
                }
                return; //This module is already in the list
            }
            //Add this module to the list
            bundle.modules[m.name] = m;
        });
    });
    //Return the bundle
    return Object.assign(bundle, {
        "modules": Object.values(bundle.modules)
    });
};

//Write the bundle
let saveBundle = function (bundle, filePath) {
    ////Add the modules at the start of the file
    //Object.values(bundle.modules).forEach(function (m) {
    //    let moduleImport = (m.as !== null) ? `@use "${m.name}" as ${m.as};` : `@use "${m.name}";`
    //    bundle.content = moduleImport + endl + bundle.content;
    //});
    ////Add the bundle header
    //if (typeof bundle.header === "string") {
    //    bundle.content = bundle.header + endl + endl + bundle.content;
    //}
    utils.mkdir(path.dirname(filePath)); //Ensure the folder exists
    return fs.writeFileSync(filePath, SCSS.stringify(bundle), "utf8"); //Write the file
};

////Build scss bundle
//let buildMainBundle = function () {
//    let bundles = ["elements", "experiments", "form", "grid", "helpers", "layout"];
//    bundles.forEach(function (folder) {
//        let files = [];
//        let folderPath = path.join(paths.src.styles, folder);
//        fs.readdirSync(folderPath, "utf8").forEach(function (file) {
//            if (file === "index.scss" || file.startsWith("_")) {
//                return; //Ignore this file
//            }
//            //Save this file
//            files.push(path.join(folderPath, file)); 
//        });
//        //Build main bundle
//        let bundle = buildBundle(files, {
//            "removeNamespaces": false
//        });
//        //Add the lib bundle to the list of imports
//        bundle.modules["lib"] = {"name": "./lib.scss", "as": "siimple"};
//        //Save the bundle
//        return saveBundle(bundle, path.join(paths.siimpleScssFolder, `${folder}.scss`));
//    });
//};

//Build the lib bundle
let buildLibBundle = function (name, files) {
    files = files.map(function (file) {
        return path.join(paths.src.styles, file); //Get real file path
    });
    //Build the bundle
    let bundle = buildBundle(files, {
        "removeNamespaces": true,
        "resolve": {}
    });
    //Save the bundle
    return saveBundle(bundle, path.join(paths.packages.folder, name, "scss", "lib.scss"));
};

//Build main and lib bundles
process.nextTick(function () {
    //Read wanted bundles list
    let packages = utils.readJSON(paths.build);
    return Object.keys(packages).forEach(function (key) {
        if (packages[key].libs === null) {
            return null; //No lib to build for this module
        }
        return buildLibBundle(key, packages[key].libs);
    });
    //buildMainBundle();
    //buildLibBundle("lib", );
});

