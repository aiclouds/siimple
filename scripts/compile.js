let fs = require("fs");
let path = require("path");
let utils = require("./utils.js");
let paths = require("../config/paths.js");

//Append auto-generated header
let appendAutoGeneratedHeader = function (content) {
    content.push("//");
    content.push("// WARNING: THIS FILE IS AUTO-GENERATED. DO NOT EDIT IT.");
    content.push("// You can generate this file running the following command from the project root:");
    content.push("// $ make build");
    content.push("//");
    return content;
};

process.nextTick(function () {
    //Compile icons
    let iconsList = utils.readJSON(paths.iconsList);
    let iconsContent = appendAutoGeneratedHeader([]); //Initialize icons content
    iconsContent.push("$list: (");
    iconsList.forEach(function (item, index) {
        let sep = (index === iconsList.length - 1) ? "" : ","; //Separator
        iconsContent.push(`    "${item.id}": "${utils.parseUnicode(item.unicode)}"${sep}`);
    });
    iconsContent.push(");");
    fs.writeFileSync(paths.iconsStyle, iconsContent.join("\n"), "utf8"); //Write icons content
});


