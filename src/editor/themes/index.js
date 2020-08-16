import {lightTheme} from "./light.js";

//Export themes
export const themes = {
    "light": lightTheme
};

//Register a new theme
//export function registerTheme (newTheme) {
//    //TODO: validate the theme
//}

//Get theme by name
export function getTheme (value) {
    if (typeof value === "string" && typeof themes[value] !== "undefined") {
        return themes[value]; //Return theme
    }
    //Other value --> throw error (TODO)
    return themes["light"];
}


