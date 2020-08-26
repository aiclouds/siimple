let fs = require("fs");
let path = require("path");
let paths = require("../../config/paths.js");

let template = require("./template.js");
let virtualFile = require("./utils/virtual-file.js");
let util = require("./utils/util.js");
let walkdir = require("./utils/walkdir.js");
let buildWebsite = require("./website.js");
let buildDocumentation = require("./documentation.js");

//Register handlebars partials
let registerPartials = function () {
    return walkdir(paths.websitePartials, [".html"], function (file) {
        let content = fs.readFileSync(path.join(paths.websitePartials, file), "utf8");
        return template.registerPartial(file, content);
    });
};

//Load icons data
let loadIconsData = function (data) {
    data["iconsList"] = util.readJSON(paths.icons.list); //path.join(paths.packages, "siimple-icons", "icons.json"));
    data["iconsCategories"] = {}; //util.readJSON(path.join(paths.packages, "siimple-icons", "categories.json"));
    //Sort icons by name
    data["iconsList"] = data["iconsList"].sort(function (a, b) {
        return (a.id < b.id) ? -1 : +1;
    });
    data["iconsList"].forEach(function (icon) {
        let name = icon.categories;
        if (typeof data["iconsCategories"][name] === "undefined") {
            data["iconsCategories"][name] = {
                "id": name,
                "name": name,
                "count": 0
            };
        }
        //Update the icons count
        let category = data["iconsCategories"][name];
        category.count = category.count + 1;
    });
};

//Load packages data
let loadPackagesData = function (data) {
    data["packages"] = {}; //Initialize packages data
    let packages = util.readJSON(paths.package).packages;
    packages.forEach(function (key) {
        let content = util.readJSON(path.join(paths.packages.folder, key, "package.json"));
        let name = key.replace("siimple-", ""); //Fix package name
        data["packages"][name] = {
            "name": content["name"],
            "version": content["version"],
            "description": content["description"]
        };
    });
};

//Build website pages
process.nextTick(function () {
    let config = util.readJSON(path.join(paths.website, "config.json")); //Import site config
    registerPartials(); //Register handlebars partials
    //Build data
    let data = {}; //Store global data object
    walkdir(paths.websiteData, [".json"], function (file) {
        let name = path.basename(file, ".json"); //Get data name
        data[name] = util.readJSON(path.join(paths.websiteData, file));
    });
    loadIconsData(data); //Load icons data
    loadPackagesData(data); //Load packages data
    //Build website content
    buildDocumentation(config, data);
    buildWebsite(config, data);
    //Write data into assets folder
    let outputAssets = {
        "iconsList": "icons-list.json", 
        "iconsCategories": "icons-categories.json"
    };
    Object.keys(outputAssets).forEach(function (key) {
        let outputPath = path.join(paths.websiteBuild, "assets", outputAssets[key]);
        return fs.writeFileSync(outputPath, JSON.stringify(data[key]), "utf8");
    });
});

