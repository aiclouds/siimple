let fs = require("fs");
let path = require("path");
let svgo = require("svgo");
let svgstore = require("svgstore");
let getArgs = require("get-args");
let paths = require("../config/paths.js");

//Build the svg sprite
process.nextTick(function () {
    let options = getArgs().options;
    if (typeof options.output !== "string") {
        throw new Error("No output file provided");
    }
    //Get all icons
    let files = fs.readdirSync(paths.iconsFolder, "utf8").filter(function (file) {
        return path.extname(file) === ".svg"; //Get only .svg files
    });
    //Sprites storage
    let sprites = svgstore();
    let parseSvgFile = function (index) {
        if (index >= files.length) {
            //Write the sprites to the file and exit
            return fs.writeFileSync(options.output, sprites, "utf8");
        }
        //Get current file
        let file = files[index];
        let content = fs.readFileSync(path.join(paths.iconsFolder, file), "utf8");
        //Initialize the svg minimize
        let prefix = path.basename(file, path.extname(file));
        let svgmin = new svgo({plugins: [{cleanupIDs: {prefix: prefix + '-', minify: true}}]});
        return svgmin.optimize(content).then(function (result) {
            sprites.add(prefix, result.data); //Add to the sprite
            return parseSvgFile(index + 1); //Next svg
        });
    };
    //Parse all svg files
    return parseSvgFile(0);
});

