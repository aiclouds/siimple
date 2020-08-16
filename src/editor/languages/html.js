import {createToken} from "../tokens.js";
import {falsy} from "../utils.js";
import {startsWith, endsWith} from "../../utils/ponyfills.js";

//List of regexp for this language
let regexp = {
    "punctuation": /^[\/=<>]/,
    "tag": /^[\w\d\.\-\_]/,
    "attribute": /^([\w\d\.\-\_]+)\=/,
    "doubleQuote": /[\"]/,
};

//Export html configuration
export const htmlLanguage = {
    "name": "html",
    "alias": null,
    "keywords": null,
    "brackets": [],
    "comments": [
        {"type": "block", "start": "<!--", "end": "-->"}
    ],
    "autoClosingPairs": [
        {"open": "<", "close": ">"},
        {"open": "{", "close": "}"},
        {"open": "[", "close": "]"},
        {"open": "(", "close": ")"}, 
        {"open": "\"", "close": "\""},
        {"open": "'", "close": "'"}
    ],
    "tokens": {
        "types": [
            null,
            null,
            "symbol.punctuation", // 2: punctuation sign (<>)
            "meta.tag", // 3: Tagname
            "meta.attribute.name", // 4: attribute name
            "meta.attribute.value", // 5: attribute value
            "comment.block" // 6: Block comment (<!-- -->)
        ],
        "nextToken": function (ctx) {
            let c = ctx.currentChar; //Get current char
            let mode = ctx.mode; //Get current mode
            if (startsWith(ctx.code, "<!--")) { return createToken(6); } //Comment token
            else if (c === "<") { return createToken(2); } //HTML punctuation
            else if (mode === "tag" && regexp.punctuation.test(c)) { return createToken(2); } //HTML punctuation
            else if (mode === "tag" && regexp.doubleQuote.test(c)) { return createToken(5); } //Attribute value
            else if (mode === "tag" && regexp.tag.test(c)) {
                return (ctx.lastChar === "<" || ctx.lastChar === "/") ? createToken(3) : createToken(4); //Tagname or attribute name
            }
            //Default --> no token found
            return null;
        },
        "closeToken": function (ctx) {
            let type = ctx.token.type; //Get token type
            let content = ctx.token.content; //Get token content
            if (type === 6) { return endsWith(content, "-->"); } //End block comment token
            else if (type === 5) { return content.length > 1 && regexp.doubleQuote.test(ctx.lastChar); } //End attribute value
            else if (type === 4) { return !regexp.tag.test(ctx.currentChar); } //End attribute name
            else if (type === 3) { return !regexp.tag.test(ctx.currentChar); } //End tagname
            else if (type === 2) { return true; } //!regexp.punctuation.test(ctx.currentChar); } //End punctuation
            //Default --> no token matched?
            return false;
        },
        "isCommentToken": function (i) {
            return i === 6;
        },
        "isKeywordToken": falsy,
        "isKeyword": falsy
    }
};







