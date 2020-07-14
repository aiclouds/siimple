let path = require("path");

//Resolve alias
let resolveTo = function (to) {
    return path.resolve(__dirname, to);
};

//Get package folder
let resolvePackageFolder = function (name) {
    return resolveTo(path.join("..", "packages", name));
};

//Export build paths
module.exports = {
    "root": resolveTo("../"),
    "package": resolveTo("../package.json"),
    "modulesFolder": resolveTo("../node_modules"),
    "packagesFolder": resolveTo("../packages"),
    "siimpleFolder": resolvePackageFolder("siimple"),
    "siimpleScssFolder": path.join(resolvePackageFolder("siimple"), "scss"),
    "siimpleDistFolder": path.join(resolvePackageFolder("siimple"), "dist"),
    "neutrineDistFolder": path.join(resolvePackageFolder("neutrine"), "dist"),
    "neutrineFolder": resolvePackageFolder("neutrine"),
    "scssFolder": resolveTo("../scss"),
    "libFolder": resolveTo("../lib"),
    "iconsStyle": resolveTo("../scss/_icons.scss"),
    "iconsList": resolveTo("../icons-list.json"),
    "iconsFolder": resolveTo("../icons/"),
    "website": resolveTo("../website"),
    "websiteData": resolveTo("../website/data"),
    "websitePartials": resolveTo("../website/partials"),
    "websitePages": resolveTo("../website/pages"),
    "websiteLayouts": resolveTo("../website/layouts"),
    "websiteBuild": resolveTo("../website/www"),
    "docs": resolveTo("../docs")
};

