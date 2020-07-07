let path = require("path");

//Resolve alias
let resolveTo = function (to) {
    return path.resolve(__dirname, to);
};

//Get package folder
let resolvePackage = function (name) {
    return resolveTo(path.join("..", "packages", name));
};

//Export build paths
module.exports = {
    "packages": {
        "siimple": resolvePackage("siimple"),
        "neutrine": resolvePackage("neutrine")
    },
    "dist": {
        "siimple": path.join(resolvePackage("siimple"), "dist"),
        "neutrine": path.join(resolvePackage("neutrine"), "dist")
    },
    "scss": resolveTo("../scss"),
    "iconsStyle": resolveTo("../scss/_icons.scss"),
    "iconsList": resolveTo("../icons-list.json"),
    "iconsFolder": resolveTo("../icons/")
};

