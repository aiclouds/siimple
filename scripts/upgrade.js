let fs = require("fs");
let path = require("path");
let paths = require("../config/paths.js");
let utils = require("./utils.js");

//Upgrade package versions
process.nextTick(function () {
    let {packages, version} = utils.readJSON(paths.package); //Get package.json file
    //let version = package.version; //Current version
   return packages.forEach(function (name) {
       let packagePath = path.join(paths.packages.folder, name, package.json); //Get package folder
       let packageContent = utils.readJSON(packagePath); //Read package content
       if (packageContent.version === version) {
           return null; //Save version --> do not update it
       }
       utils.log.info(`Upgrade '${name}' package version to '${version}'`);
       packageContent.version = version; //Update package version
       //Update dependencies versions
       if (typeof packageContent.dependencies === "object") {
           Object.keys(packageContent.dependencies).forEach(function (dep) {
               if (packages.indexOf(dep) === -1) {
                   return null; //Nothing to do
               }
               //Update the version
               packageContent.dependencies[dep] = version;
           });
       }
       //Write the package.json file
       return utils.writeJSON(packagePath, packageContent);
   });
});

