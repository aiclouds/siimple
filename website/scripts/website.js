let fs = require("fs");
let path = require("path");
let paths = require("../../config/paths.js");

let template = require("./template.js");
let virtualFile = require("./utils/virtual-file.js");
let util = require("./utils/util.js");
let walkdir = require("./utils/walkdir.js");

//Build website pages
module.exports = function (config, data) {
    //Initialize page template
    let pageTemplate = template.page({
        "header": config.header,
        "body": fs.readFileSync(path.join(paths.websiteLayouts, "default.html"), "utf8")
    });
    let compilePageTemplate = function (content) {
        return pageTemplate.replace(/\{\{(?:\s*)(content)(?:\s*)\}\}/g, content);
    };
    //Build pages
    walkdir(paths.websitePages, [".html"], function (file) {
        let page = virtualFile(path.join(paths.websitePages, file)); //Create the new virtual file
        virtualFile.read(page); //Read virtual file content
        //Build the output filename
        let outputPagePath = path.normalize(path.format({
            "root": "/",
            "dir": path.join("/", path.dirname(file)),
            "name": path.basename(file, path.extname(file)),
            "ext": ".html"
        }));
        //Generate page content
        let pageContent = template.compile(compilePageTemplate(page.content), {
            "site": config,
            "page": {
                "url": outputPagePath,
                "title": page.data.title,
                "data": page.data
            },
            "data": data,
            "title": "Hello world"
        });
        //Update the virtualfile with the new folder and paths
        Object.assign(page, {
            "dirname": path.join(paths.websiteBuild, path.dirname(outputPagePath)),
            "content": pageContent,
            "extname": ".html"
        });
        //Write the virtual file
        return virtualFile.write(page);
    });
};

