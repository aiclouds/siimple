let fs = require("fs");
let path = require("path");
let SVGIcons2SVGFontStream = require("svgicons2svgfont");
let getArgs = require("get-args");
let utils = require("./utils.js");

//Function that does nothing
let noop = function () {
    return;
};

//Build the SVG font
process.nextTick(function () {
    let icons = utils.readJSON(path.resolve(__dirname, "../icons-list.json"));
    let options = getArgs().options;
    let fontStream = new SVGIcons2SVGFontStream({
        "fontName": "SiimpleIcons", 
        "normalize": true, 
        "fontHeight": 1000, 
        "log": noop
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
        let iconPath = path.resolve(__dirname, `../icons/${icon.id}.svg`);
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


