import {createToken} from "../tokens.js";
import {startsWith, endsWith} from "../../common/ponyfills.js";

//Javascript keywords
let keywords = [
    "abstract","arguments","async","await","break","case","catch","class","const","continue","constructor",
    "debugger","default","delete","do","else","export","extends","false","finally","for","from",
    "function","if","implements","import","in","instanceof","interface","let","module","new",
    "null","of","return","static","super","switch","symbol","this","throw","true",
    "try","typeof","undefined","var","void","while","with","yield"
];

//List of regexp for this language
let regexp = {
    "word": /[\w]/,
    "number": /[\d\.]/,
    "punctuation": /^[{}[\](\):;\\.,]/,
    "operator": /^[?!&@~\/\-+*=<>|]/,
    "keywords": new RegExp(`^(${keywords.join("|")})$`, ""),
    "doubleQuote": /[\"]/,
    "singleQuote": /[\']/,
    "backtick": /[`]/
};

//Export javascript configuration
export const javascriptLanguage = {
    "name": "js",
    "alias": ["javascript"],
    "keywords": keywords,
    "brackets": [],
    "comments": [
        {"type": "block", "start": "/*", "end": "*/"},
        {"type": "line", "start": "//"}
    ],
    "autoClosingPairs": [
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
            "keyword.language", //2: js general keywords
            "constant.number",  //3: general number
            "symbol.operator",  // 4: operator sign
            "symbol.punctuation", // 5: JS punctuation sign
            "string.double", // 6: Double quote string (")
            "string.single", // 7: Single quote string (')
            "string.backtick", // 8: Backtick string
            "comment.block", // 9: Block comment (/*   */)
            "comment.line" // 10: Line comment (//  )
        ],
        "nextToken": function (ctx) {
            let c = ctx.currentChar; //Get current char
            if (startsWith(ctx.code, "/*")) { return createToken(9); } //Block comment token
            else if (startsWith(ctx.code, "//")) { return createToken(10); } //Line comment token
            else if (regexp.backtick.test(c)) { return createToken(8); } //Backtick string
            else if (regexp.singleQuote.test(c)) { return createToken(7); } //Single quote string
            else if (regexp.doubleQuote.test(c)) { return createToken(6); } //Double quote string
            else if (regexp.punctuation.test(c)) { return createToken(5); } //Punctuation token
            else if (regexp.operator.test(c)) { return createToken(4); } //Operator token
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
            else if (type === 4 || type === 5) { return true; } //Always end a punctuation or operator sign
            else if (type === 6) { return content.length > 1 && regexp.doubleQuote.test(ctx.lastChar); } //End double quotes
            else if (type === 7) { return content.length > 1 && regexp.singleQuote.test(ctx.lastChar); } //End single quotes
            else if (type === 8) { return content.length > 1 && regexp.backtick.test(ctx.lastChar); } //End backtick quotes
            else if (type === 9) { return endsWith(content, "*/"); } //End block comment token
            else if (type === 10) { return ctx.currentChar === "\n"; } //End single line token
            //Default --> no token matched?
            return false;
        },
        "isCommentToken": function (i) {
            return i === 9 || i === 10;
        },
        "isKeywordToken": function (i) {
            return i === 2;
        },
        "isKeyword": function (value) {
            return regexp.keywords.test(value);
        }
    }
};



