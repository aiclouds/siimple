let fs = require("fs");
let path = require("path");
let SVGIcons2SVGFontStream = require("svgicons2svgfont");
let getArgs = require("get-args");
let utils = require("./utils.js");
let paths = require("./paths.js");

//Build the SVG font
process.nextTick(function () {
    let icons = utils.readJSON(paths.iconsList);
    let options = getArgs().options;
    let fontStream = new SVGIcons2SVGFontStream({
        "fontName": "SiimpleIcons", 
        "normalize": true, 
        "fontHeight": 1000, 
        "log": function () { return; }
    });
    let writer = fs.createWriteStream(options.output);
    fontStream.pipe(writer);
    //Error listener
    fontStream.on('error', function (error) {
        process.stderr.write(error.message);
        return process.exit(1);
    });
    //Writer finished
    writer.on('finish', function () {
        return process.exit(0);
    });
    //Add each icon in the font stream
    icons.forEach(function (icon) {
        //process.stdout.write("Adding icon '" + icon.id + "' to SVG font");
        let iconPath = path.join(paths.iconsFolder, `${icon.id}.svg`);
        let iconReader = fs.createReadStream(iconPath);
        //Set the icon metadata
        iconReader.metadata = {
            "unicode": [String.fromCharCode(icon.unicode)], 
            "name": icon.id
        };
        //Write the icon
        fontStream.write(iconReader);
    });
    fontStream.end();
});


