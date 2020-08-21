let path = require("path");
let paths = require("./config/paths.js");
let {terser} = require("rollup-plugin-terser");
let cleanup = require("rollup-plugin-cleanup");
let ignoreImport = require("rollup-plugin-ignore-import");

//Generate the banner
let banner = [];
banner.push("/*!*");
banner.push(" * This source code is licensed under the MIT license found in the");
banner.push(" * LICENSE file in the root directory of this source tree.");
banner.push(" */");
banner.push("");

//Output bundle extensions
let outputBundleExtensions = ["umd", "umd.min", "esm", "esm.min"].map(function (ext) {
    return `${ext}.js`; //Add js extension
});

//Create the configuration for the main module
let createMainConfig = function (inputFile, outputFile, outputName) {
    //Initialize the configuration object
    let config = {
        "input": inputFile,
        "output": outputBundleExtensions.map(function (extname) {
            //Initialize the output object
            let output = {
                "format": extname.replace(".min.js", "").replace(".js", "") 
            };
            //Check for umd export
            if (output.format === "umd") {
                Object.assign(output, {"extend": true, "name": outputName});
            }
            //Check for minimized file
            if (extname.endsWith(".min.js") === true) {
                Object.assign(output, {"plugins": [terser()]});
            }
            //Assign other output configuration
            return Object.assign(output, {
                "file": path.join(paths.packages.neutrine, "dist", `${outputFile}.${extname}`),
                "globals": {"react": "React", "react-dom": "ReactDOM"},
                "banner": banner.join("\n")
            });
        }),
        "external": ["react", "react-dom"],
        "plugins": [
            ignoreImport({"extensions": [".scss", ".css"]}),
            cleanup()
        ]
    };
    //Return the configutation
    return config;
};

//Create the lib configuration
let createLibConfig = function (inputFile, outputFile) {
    //Initialize the configuration object
    let config = {
        "input": path.join(paths.packages.neutrine, inputFile),
        "output": {
            "format": "esm",
            "file": path.join(paths.packages.neutrine, "lib", `${outputFile}.js`),
            "globals": {"react": "React", "react-dom": "ReactDOM"},
            "plugins": [terser()],
            "banner": banner.join("\n")
        },
        "external": ["react", "react-dom"],
        "plugins": [
            ignoreImport({"extensions": [".scss", ".css"]}),
            cleanup()
        ]
    };
    //Return the configutation
    return config;
};

//Export the configuration object
module.exports = [
    //createMainConfig(path.join(__dirname, "./src/components/index.js"), "neutrine", "Neutrine"),
    createLibConfig("./src/components/index.js", "components"),
    createLibConfig("./src/datatable/index.js", "datatable"),
    createLibConfig("./src/editor/index.js", "editor"),
    createLibConfig("./src/widgets/index.js", "widgets"),
    createLibConfig("./src/utils/index.js", "utils")
];

