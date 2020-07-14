import {htmlLanguage} from "./html.js";
import {javascriptLanguage} from "./javascript.js";
import {jsonLanguage} from "./json.js";

//Languages mappings
export const languages = {
    "html": htmlLanguage,
    "js": javascriptLanguage,
    "json": jsonLanguage
};

//Register a new language
//export function registerLanguage (spec) {
//    languages[spec.name] = spec; //Register the main language name
//    //TODO: register aliases for this language
//}

//Get a language by name
export function getLanguage (name) {
    //TODO: check if the language name is an alias
    return (typeof name === "string" && typeof languages[name] !== "undefined") ? languages[name] : null;
}

//Get auto-closing pairs
export function getAutoClosingPairsFromLanguage (lang) {
    let parsedPairs = {"open": [], "close": []};
    if (typeof lang === "object" && lang !== null) {
        let pairs = lang["autoClosingPairs"]; //Get current values
        if (typeof pairs === "object" && pairs !== null) {
            pairs.forEach(function (pair) {
                parsedPairs.open.push(pair.open); //Save pair open character
                parsedPairs.close.push(pair.close); //Save pair close character
            });
        }
    }
    //Return pairs
    return parsedPairs;
}

