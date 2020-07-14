//Default delimiter
let delimiter = "/";
let extnameRegexp = /[\w]+\.([0-9a-z]+)$/i;

//Split a path
export function splitPath (path) {
    return path.split(delimiter).filter(function (segment) {
        return segment.length > 0; //Ignore empty segments
    });
}

//Check for an absolute path
export function isAbsolutePath (path) {
    return path.charAt(0) === delimiter;
}

//Normalize path
export function normalizePath (path) {
    return path; //TODO
}

//Join paths
export function joinPath () {
    let path = ""; //Output path
    for (let i = 0; i < arguments.length; i++) {
        let segment = arguments[i]; //Get path segment
        if (typeof segment !== "string") {
            throw new Error(`Invalid path segment: expected string, but got '${typeof segment}'`);
        }
        //Check for no empty segment
        if (segment.length > 0) {
            path = (path === "") ? segment : path + delimiter + segment;
        }
    }
    //Return normalized path
    return normalizePath(path);
}

//Get the extension of the file
export function extnamePath (path) {
    let match = path.match(extnameRegexp);
    if (match === null) {
        return ""; //Provided path has no extension
    }
    //Return the extname WITH the dot
    return "." + match[1];
}



