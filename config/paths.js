let path = require("path");

//Resolve alias
let resolveTo = function (to) {
    return path.resolve(__dirname, to);
};

//Common folders
let packages = resolveTo("../packages");

//Export build paths
module.exports = {
    "root": resolveTo("../"),
    "package": resolveTo("../package.json"),
    "modules": resolveTo("../node_modules"),
    //Packages folders
    "packages": {
        "folder": packages,
        "siimple": path.join(packages, "siimple"),
        "neutrine": path.join(packages, "neutrine"),
        "icons": path.join(packages, "siimple-icons"),
        "experiments": path.join(packages, "siimple-experiments"),
        "lib": path.join(packages, "siimple-lib")
    },
    //Icons sources
    "icons": {
        "list": resolveTo("./icons.json"),
        "folder": path.join(packages, "siimple-icons", "svg"),
        "lib": path.join(packages, "siimple-lib", "scss", "lists", "icons.scss"),
    },
    //Colors sources
    "colors": {
        "list": resolveTo("./colors.json"),
        "lib": path.join(packages, "siimple-lib", "scss", "lists", "colors.scss")
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

