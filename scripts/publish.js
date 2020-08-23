let fs = require("fs");
let getArgs = require("get-args");
let readline = require("readline");
let utils = require("./utils.js");
let paths = require("../config/paths.js");

//Publish the specified version
process.nextTick(function () {
    let version = getArgs().options.version;
    let package = utils.readJSON(paths.package); //Read package.json
    if (package.version !== version) {
        let message = `The publish version ('${version}') does not match the package.json current version ('${package.version}')`;
        return utils.log.error(message);
    }
    //Display confirmation message
    utils.log.info(`You are going to publish the version '${version}'`);
    let rl = readline.createInterface({"input": process.stdin, "output": process.stdout});
    return rl.question("[INFO] Continue with the publish? [Y/n]: ", function (answer) {
        rl.close(); //Close the prompt
        if (answer !== "Y") {
            return utils.log.error("Publish aborted");
        }
        //Continue with the publish
        return utils.log.info("Publish accepted by the user. Continue....");
    });
});



