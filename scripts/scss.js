let path = require("path");
let log = require("./utils.js").log;

//Global variables
let endl = "\n";
let useRegexp = /@use\s+\"([^"]*)\"(?:\s+as\s+([^;].*))?\s*;/; //For capturing includes

//Split lines
let splitLines = function (lines) {
    return lines.replace(/\r/g, "").split(endl);
};

//Parse a SCSS import line
//index and filePath are used for displaying errors and warnings
let parseSCSSImport = function (line, index) {
    let match = line.match(useRegexp);
    //Check for no match ---> throw error
    if (match === null) {
        return log.error(`Unknown @use pattern '${line}' on line '${index}'`); //of file '${filePath}'`);
    }
    let isLocal = match[1].startsWith("sass:") === false;
    let namespace = (typeof match[2] === "string") ? match[2] : null;
    //Check for no named import
    if (typeof match[2] !== "string" && isLocal === true) {
        log.error(`Module '${match[1]}' has no named import`); // on file '${filePath}'`);
    }
    //Return the library info
    return {
        "isLocal": isLocal,
        "name": match[1],
        "as": namespace
    };
};

//Parse a SCSS file string
module.exports.parse = function (content, options) {
    let allImports = []; //To store files includes
    content = splitLines(content).filter(function (line, index) {
        line = line.trim();
        if (line.length === 0 || line.startsWith("//")) {
            return false; //Ignore empty lines or comments
        }
        //Check for include library
        if (line.startsWith("@use")) {
            allImports.push(parseSCSSImport(line, index)); //Save include lib
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
    //Resolve modules
    if (typeof options.resolve === "object" && options.resolve !== null) {
        //Resolve scss imports
        allImports = allImports.map(function (m) {
            if (typeof options.resolve[m.name] === "undefined") {
                return m; //Not in the list
            }
            //Change the path of this module
            return Object.assign(m, {"name": options.resolve[m.name]});
        });
    }
    //Return file object
    return {
        //"path": filePath,
        "content": content.join(endl),
        "header": null,
        //"modules": Object.values(allImports).filter(function (lib) {
        //    return lib.isLocal === false; //Get only global modules
        //}),
        "modules": allImports,
        "metadata": [] //["//", `//@bundle ${path.basename(filePath)}`, "//"].join(endl)
    };
};

//Convert a SCSS file object to string
module.exports.stringify = function (file) {
    let content = file.content; //Initialize the content
    //Add the modules at the start of the file
    file.modules.forEach(function (m) {
        let moduleImport = (m.as !== null) ? `@use "${m.name}" as ${m.as};` : `@use "${m.name}";`
        content = moduleImport + endl + content;
    });
    //Add the bundle header
    if (typeof file.header === "string") {
        content = file.header + endl + endl + content;
    }
    //Return the file content
    return content;
};




