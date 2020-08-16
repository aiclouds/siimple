import {createToken} from "../tokens.js";
import {startsWith, endsWith} from "../../utils/ponyfills.js";
import {falsy} from "../utils.js";

//JSON keywords
let keywords = ["null", "true", "false"];

//List of regexp for this language
let regexp = {
    "word": /[\w]/,
    "number": /[\d\.]/,
    "punctuation": /^[{}[\](\):;\\.,]/,
    "keywords": new RegExp(`^(${keywords.join("|")})$`, "")
};

//Export JSON configuration
export const jsonLanguage = {
    "name": "json",
    "alias": null,
    "keywords": keywords,
    "brackets": [],
    "comments": [],
    "autoClosingPairs": [
        {"open": "{", "close": "}"},
        {"open": "[", "close": "]"},
        {"open": "(", "close": ")"},
        {"open": "\"", "close": "\""}
    ],
    "tokens": {
        "types": [
            null,
            null,
            "keyword.language", // 2: Keyword
            "constant.number", // 3: Number
            "symbol.punctuation", // 4: punctuation sign
            "string.double" // 5: Double quote string (")
        ],
        "nextToken": function (ctx) {
            let c = ctx.currentChar; //Get current char
            if (c === "\"") { return createToken(5); } //Double quote string
            else if (regexp.punctuation.test(c)) { return createToken(4); } //Punctuation token
            else if (regexp.number.test(c)) { return createToken(3); } //Number
            else if (regexp.word.test(c)) { return createToken(2); } //Keyword
            //Default --> no token found
            return null;
        },
        "closeToken": function (ctx) {
            let type = ctx.token.type; //Get token type
            let content = ctx.token.content; //Get token content
            if (type === 2) { return !regexp.word.test(ctx.currentChar); } //End of word
            else if (type === 3) { return !regexp.number.test(ctx.currentChar); } //Check for no digit
            else if (type === 4) { return true; } //Always end a punctuation or operator sign
            else if (type === 5) { return content.length > 1 && ctx.lastChar === "\""; } //End double quotes
            //Default --> no token matched?
            return false;
        },
        "isCommentToken": falsy,
        "isKeywordToken": function (i) {
            return i === 2;
        },
        "isKeyword": function (value) {
            return regexp.keywords.test(value);
        }
    }
};






