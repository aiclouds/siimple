import {escape} from "../common/escape.js";

// Tokens reference
// Inspired in https://www.sublimetext.com/docs/3/scope_naming.html
//
// > comment: single and multi-line comments
// comment.block   --> for multi-line comments
// comment.line:   --> for single line comments
//
// > constant
// constant.boolean    --> boolean literals
// constant.numeric    --> numeric literals
// constant.language   --> language specific constants (like null values)
// constant.regexp     --> regexp literals
//
// > keyword
// keyword.control     --> control keywords ('if', 'for')
// keyword.language    --> language keywords
// keyword.operator    --> word operators ('or', 'and')
//
// > meta: language specific expressions and blocks
// meta.tag
// meta.attribute.name
// meta.attribute.value
//
// > markup --> used for content, as opposed to code (TODO)
//
// > string
// string.double     --> double quoted strings
// string.single     --> single quote strings
// string.backtick   --> backtick quoted strings
//
// > symbol: operators or punctuation symbols
// symbol.operator    --> operator symbol
// symbol.punctuation --> punctuation symbol
//
// > text: 
// text.whitespace    --> whitespaces or new lines
// text.word          --> word
//

//Create a token
export function createToken (t) {
    return {"type": t, "content": ""};
}

//Render a token
export function renderToken (token, lang, theme, options) {
    let content = escape(token.content); //Escaape HTML characters
    let tokenName = lang.tokens.types[token.type]; //Get token name
    //Check for keyword token
    if (lang.tokens.isKeywordToken(token.type)) {
        token.type = (lang.tokens.isKeyword(token.content)) ? token.type : 1;
    }
    //console.log(`${tokens.get(ctx.token.type)}: '${ctx.token.content}'`);
    //Check for words or whitespaces
    if (token.type === 0 || token.type === 1) {
        return content;
    }
    //Render the token
    let tokenColor = theme.tokens[tokenName].foreground; //Get token color
    return `<span style="color:${tokenColor};">${content}</span>`;
}


