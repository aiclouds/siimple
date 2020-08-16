import {startsWith, endsWith} from "../utils/ponyfills.js";
import {escape} from "../utils/string.js";
import {createToken, renderToken} from "./tokens.js";
import {getLanguage} from "./languages/index.js";

//Global regular expressions
let regexp = {
    "nonWhitespace": /[\S]/,
    "word": /[\w]/
};

//Create a new context
let createContext = function (code) {
    return {
        "code": code, //Code to parse
        "currentChar": null, //Current char
        "nextChar": code[0], //Next char
        "lastChar": null, //Previous char
        "token": createToken(0), //Current token
        "mode": null, //Token mode
        "subLanguage": null
    };
};

//End token
//TODO: use switch | if-else | lockup table ?
//https://www.oreilly.com/library/view/high-performance-javascript/9781449382308/ch04.html#if-else_versus_switch
//BUT: https://medium.com/front-end-weekly/switch-case-if-else-or-a-lookup-map-a-study-case-de1c801d944
let endToken = function (ctx, lang) {
    //Check for 0 (whitespace) or 1 (word) tokens
    if (ctx.token.type === 0) { 
        return regexp.nonWhitespace.test(ctx.currentChar); //End of whitespace
    }
    else if (ctx.token.type === 1) { 
        return !regexp.word.test(ctx.currentChar); //Check for no word
    }
    //Default --> check for language tokens
    return lang.tokens.closeToken(ctx);
};

//Next token
let nextToken = function (ctx, lang) {
    let newToken = lang.tokens.nextToken(ctx, lang); //Get token index
    if (newToken !== null) {
        return newToken; //Valid token --> return this token
    }
    //Check for creating a word token
    if (regexp.word.test(ctx.currentChar) === true) {
        return createToken(1); //1 is a word token
    }
    //Default ---> return a whitespace token
    return createToken(0);
};

//Private text colorize function
let colorizeText = function (code, lang, theme, end, options) {
    let result = ""; //Highlight result text
    let ctx = createContext(code); //Initialize context
    //Parse all characters of the code
    while (true) {
        ctx.lastChar = (ctx.lastChar === "\\" && !lang.tokens.isCommentToken(ctx.token.type)) ? 1 : ctx.currentChar;
        ctx.currentChar = ctx.nextChar; //Update current char
        ctx.nextChar = ctx.code[1]; //Get next char
        //Check for no current char or if token has been ended
        if (typeof ctx.currentChar !== "string" || endToken(ctx, lang)) {
            //Check for non empty token --> append to the output string
            if (typeof ctx.token.content === "string" && ctx.token.content.length > 0) {
                result = result + renderToken(ctx.token, lang, theme, options); //Render token
            }
            //Check for HTML code --> update the context
            if (lang.name === "html") {
                if (ctx.lastChar === "<") { ctx.mode = "tag"; }
                else if (ctx.lastChar === ">") {
                    if (ctx.subLanguage === "js" || ctx.sublanguage === "css") {
                        let res = null;
                        //Check the sublanguage
                        if (ctx.subLanguage === "js") {
                            res = colorizeText(ctx.code, getLanguage("js"), theme, "</script>", options); 
                        }
                        else if (ctx.subLanguage === "css") {
                            res = colorizeText(ctx.code, getLanguage("css"), theme, "</style>", options);
                        }
                        result = result + res.result; //Add parsed result
                        Object.assign(ctx, {"code": res.code, "currentChar": res.code[0], "nextChar": res.code[1]});
                        ctx.subLanguage = null; //Clear sublanguage
                    }
                    ctx.mode = null; //Clear mode
                }
                //Check the last token type
                if (ctx.token.content === "<" && startsWith(ctx.code, "script")) { ctx.subLanguage = "js"; } //JS lang
                //else if (ctx.token.content === "<" && startsWith(ctx.code, "style")) { ctx.mode = "css"; } //CSS mode
            }
            //Check for js or stylecode and end tag provided
            if (typeof end === "string" && startsWith(ctx.code, end)) {
                break; //Stop while loop
            }
            //Check for no more chars to parse
            if (typeof ctx.currentChar !== "string") {
                break; //Stop while loop
            }
            //Get the next token
            ctx.token = nextToken(ctx, lang);
        }
        //Save next character in the token
        ctx.token.content = ctx.token.content + ctx.currentChar;
        ctx.code = ctx.code.substr(1); //Remove the first character
    }
    //Return the highlighted text
    return {"result": result, "code": ctx.code};
};

//Colorize method
export function colorize (code, lang, theme, options) {
    if (lang === null) {
        return code; //No language --> return text
    }
    //Colorize the provided code
    return colorizeText(code, lang, theme, null, options).result;
}

//Colorize an element
export function colorizeElement (el, lang, theme, options) {
    let code = el.textContent; //Get current text content
}

