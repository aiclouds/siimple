let fs = require("fs");
let path = require("path");

//Get a list with all packages available
module.exports.getPackages = function (parent) {
    let pkgs = {};
    fs.readdirSync(parent, "utf8").forEach(function (folderName) {
        let folderPath = path.join(parent, folderName);
        let pkgPath = path.join(folderPath, "package.json");
        //Check if path is not a directory
        if (fs.lstatSync(folderPath).isDirectory() === false) {
            return null;
        }
        //Check for no package.json 
        if (fs.existsSync(pkgPath) === false) {
            return null;
        }
        //Read the package content
        let content = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        //Save the package metadata
        pkgs[content.name] = content;
    });
    //Return the list of available packages
    return pkgs;
};

//Read a JSON file
module.exports.readJSON = function (file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
};

//Write a JSON file
module.exports.writeJSON = function (file, content) {
    return fs.writeFileSync(file, JSON.stringify(content), "utf8");
};

//For displaying basic logs
module.exports.log = {
    "info": function (message) {
        return console.log(`[INFO] ${message}`);
    },
    "warn": function (message) {
        return console.warn(`[WARNING] ${message}`);
    },
    "error": function (message) {
        console.error(`[ERROR] ${message}`);
        return process.exit(1); //Stop process
    }
};

//Create a folder recursive
module.exports.mkdir = function (folder) {
    if (fs.existsSync(folder) === false) {
        return fs.mkdirSync(folder, {"recursive": true});
    }
};

