let fs = require("fs");
let path = require("path");
let paths = require("../config/paths.js");

//For displaying logs (TODO: move as a module)
let log = {
    "warn": function (message) {
        return console.warn(`[WARNING] ${message}`);
    },
    "error": function (message) {
        console.error(`[ERROR] ${message}`);
        return process.exit(1); //Stop process
    }
};

//Global variables
let endl = "\n";
let useRegexp = /@use\s+\"([^"]*)\"(?:\s+as\s+([^;].*))?\s*;/; //For capturing includes

//Split lines
let splitLines = function (lines) {
    return lines.replace(/\r/g, "").split(endl);
};

//Parse a SCSS import line
//index and filePath are used for displaying errors and warnings
let parseSCSSImport = function (line, index, filePath) {
    let match = line.match(useRegexp);
    //Check for no match ---> throw error
    if (match === null) {
        return log.error(`Unknown @use pattern '${line}' on line '${index}' of file '${filePath}'`);
    }
    let isLocal = match[1].startsWith("sass:") === false;
    let namespace = (typeof match[2] === "string") ? match[2] : null;
    //Check for no named import
    if (typeof match[2] !== "string" && isLocal === true) {
        log.error(`Module '${match[1]}' has no named import on file '${filePath}'`);
    }
    //Return the library info
    return {
        "isLocal": isLocal,
        "name": match[1],
        "as": namespace
    };
};

//Parse a SCSS file
let parseSCSS = function (filePath, options) {
    let allImports = []; //To store files includes
    let content = splitLines(fs.readFileSync(filePath, "utf8")).filter(function (line, index) {
        line = line.trim();
        if (line.length === 0 || line.startsWith("//")) {
            return false; //Ignore empty lines or comments
        }
        //Check for include library
        if (line.startsWith("@use")) {
            allImports.push(parseSCSSImport(line, index, filePath)); //Save include lib
            return false; //Ignore use lines
        }
        return true; //Other ---> include line
    });
    //Remove local imports namespaces
    if (options.removeNamespaces === true) {
        let localImports = allImports.filter(function (lib) {
            return lib.isLocal === true; //Get only local imports
        }).map(function (lib) {
            return lib.as; //Get lib name
        });
        //console.log(filePath);
        //console.log(localImports);
        if (localImports.length > 0) {
            //Find the import and replace in all lines
            content = content.map(function (line) {
                return line.replace(new RegExp(`(${localImports.join("|")})\\.`, "g"), "");
            });
        }
    }
    //Return file object
    return {
        "path": filePath,
        "content": content,
        "modules": Object.values(allImports).filter(function (lib) {
            return lib.isLocal === false; //Get only global modules
        }),
        "metadata": ["//", `//@bundle ${path.basename(filePath)}`, "//"].join(endl)
    };
};

//Build bundle
let buildBundle = function (files, options) {
    let bundle = {"content": "", "modules": {}, "header": null}; //Output bundle
    //Process all files in the list
    files.forEach(function (file) {
        let scss = parseSCSS(file, options);
        bundle.content = bundle.content + endl + scss.metadata + endl; //Save scss metdatata to bundle
        //Add scss file content
        scss.content.forEach(function (line) {
            bundle.content = bundle.content + line + endl;
        });
        //Parse modules
        scss.modules.forEach(function (m) {
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
    return bundle;
};

//Write the bundle
let saveBundle = function (bundle, filePath) {
    //Add the modules at the start of the file
    Object.values(bundle.modules).forEach(function (m) {
        let moduleImport = (m.as !== null) ? `@use "${m.name}" as ${m.as};` : `@use "${m.name}";`
        bundle.content = moduleImport + endl + bundle.content;
    });
    //Add the bundle header
    if (typeof bundle.header === "string") {
        bundle.content = bundle.header + endl + endl + bundle.content;
    }
    //Write the file
    return fs.writeFileSync(filePath, bundle.content, "utf8");
};

//Build scss bundle
let buildMainBundle = function () {
    let bundles = ["elements", "experiments", "form", "grid", "helpers", "layout"];
    bundles.forEach(function (folder) {
        let files = [];
        let folderPath = path.join(paths.scssFolder, folder);
        fs.readdirSync(folderPath, "utf8").forEach(function (file) {
            if (file === "index.scss" || file.startsWith("_")) {
                return; //Ignore this file
            }
            //Save this file
            files.push(path.join(folderPath, file)); 
        });
        //Build main bundle
        let bundle = buildBundle(files, {
            "removeNamespaces": false
        });
        //Add the lib bundle to the list of imports
        bundle.modules["lib"] = {"name": "./lib.scss", "as": "siimple"};
        //Save the bundle
        return saveBundle(bundle, path.join(paths.siimpleScssFolder, `${folder}.scss`));
    });
};

//Build the lib bundle
let buildLibBundle = function () {
    let files = ["_utils.scss", "_variables.scss", "_icons.scss", "_lists.scss", "_functions.scss", "_mixins.scss"];
    files = files.map(function (file) {
        return path.join(paths.scssFolder, file); //Get real file path
    });
    //Build the bundle
    let bundle = buildBundle(files, {
        "removeNamespaces": true
    });
    //Save the bundle
    return saveBundle(bundle, path.join(paths.siimpleScssFolder, "lib.scss"));
};

//Build main and lib bundles
process.nextTick(function () {
    buildMainBundle();
    buildLibBundle();
});

