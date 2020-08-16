let path = require("path");

//Resolve alias
let resolveTo = function (to) {
    return path.resolve(__dirname, to);
};

//Get package folder
let resolvePackageFolder = function (name) {
    return resolveTo(path.join("..", "packages", name));
};

//Common folders
let pkgs = resolveTo("../packages");
let src = resolveTo("../src");

//Export build paths
module.exports = {
    "root": resolveTo("../"),
    "package": resolveTo("../package.json"),
    "modules": resolveTo("../node_modules"),
    "colors": resolveTo("./colors.json"),
    "icons": resolveTo("./icons.json"),
    "build": resolveTo("./build.json"),
    //Packages folders
    "packages": {
        "folder": pkgs,
        "siimple": path.join(pkgs, "siimple"),
        "neutrine": path.join(pkgs, "neutrine"),
        "icons": path.join(pkgs, "siimple-icons"),
        "experiments": path.join(pkgs, "siimple-experiments"),
        "lib": path.join(pkgs, "siimple-lib")
    },
    //Sources
    "src": {
        "folder": src,
        "styles": path.join(src, "styles"),
        "icons": path.join(src, "icons")
    },
    //Compiled styles paths
    "styles": {
        "icons": path.join(src, "styles", "icons", "_lists.scss"),
        "colors": path.join(src, "styles", "colors", "_lists.scss")
    },
    //Other paths
    "website": resolveTo("../website"),
    "websiteData": resolveTo("../website/data"),
    "websitePartials": resolveTo("../website/partials"),
    "websitePages": resolveTo("../website/pages"),
    "websiteLayouts": resolveTo("../website/layouts"),
    "websiteBuild": resolveTo("../website/www"),
    "docs": resolveTo("../docs")
};

