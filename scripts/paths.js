let path = require("path");

//Resolve alias
let resolveTo = function (to) {
    return path.resolve(__dirname, to);
};

//Export build paths
module.exports = {
    "dist": {
        "siimple": resolveTo("../packages/siimple/dist")
    },
    "scss": {
        "icons": resolveTo("../scss/icons/_icons.scss")
    },
    "iconsList": resolveTo("../icons-list.json"),
    "iconsFolder": resolveTo("../icons/")
};

