//Capitalize an string
export function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Check if a string starts with the specified substring
//Ponyfill of str.startsWith: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
export function startsWith (str, search) {
    return search.length <= str.length && str.substring(0, search.length) === search;
}

//Check if a string ends with the speficied substring
//Ponyfill of str.endsWith: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
export function endsWith (str, search) {
    return search.length <= str.length && str.substring(str.length - search.length, str.length) === search;
}

//Get all keys of an object
export function objectKeys (obj) {
    return Object.keys(obj);
}

//Get all values of an object
export function objectValues (obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}


