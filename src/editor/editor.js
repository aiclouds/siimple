import {createElement, clearElement} from "../utils/dom.js";
import {colorize} from "./colorize.js";
import {getTheme} from "./themes/index.js";
import {getLanguage, getAutoClosingPairsFromLanguage} from "./languages/index.js";

//Check if the provided char is a quote char
let isQuoteChar = function (char) {
    return char === "'" || char === "\"" || char === "`";
};

//Check if a string only contains whitespaces
let hasOnlyWhitespaces = function (str) {
    return str.replace(/\s/g, "").length === 0;
};

//Default options
let defaultOptions = {
    "language": null,
    "theme": "default",
    "tabSize": 4,
    "indentWithTabs": false,
    "autoClosing": true,
    "lineNumbers": true,
    "readonly": false,
    "grammarCheck": false
};

//Build editor state
let buildEditorState = function (options, prevState) {
    let newState = Object.assign({
        "code": (typeof prevState.code === "string") ? prevState.code : "",
        "lines": (typeof prevState.lines === "number") ? prevState.lines : 0,
        "language": getLanguage(options.language),
        "theme": getTheme(options.theme),
        "autoClosingPairs": null
    });
    //Build derived state values from theme or language
    newState["autoClosingPairs"] = getAutoClosingPairsFromLanguage(newState["language"]);
    //Return the initial state
    return newState;
};

//Editor main class
let Editor = function (parent, options) {
    this.options = Object.assign({}, defaultOptions, options); //Parse options
    this.state = buildEditorState(this.options, {}); //Editor state
    //Editor referenced elements
    this.ref = {
        "parent": parent
    };
};

//Editor prototype
Editor.prototype = {
    "init": function (value) {
        let self = this;
        //Create wrapper
        this.ref.wrapper = createElement("div", this.ref.parent);
        this.ref.wrapper.classList.add("siimple__editor");
        //Create code textarea
        this.ref.code = createElement("textarea", this.ref.wrapper);
        this.ref.code.classList.add("siimple__editor-code");
        //Create preview element
        this.ref.preview = createElement("pre", this.ref.wrapper);
        this.ref.preview.classList.add("siimple__editor-preview");
        //Lines
        this.ref.lines = createElement("div", this.ref.wrapper);
        this.ref.lines.classList.add("siimple__editor-lines");
        this.updateLines(); //Update lines
        //Register textarea listeners
        this.ref.code.addEventListener("input", function (event) {
            self.updateCode(event.target.value);
        });
        this.ref.code.addEventListener("keydown", function (event) {
            self.handleTab(event);
            self.handleClosingChar(event);
            self.handleNewLine(event);
            self.handleBackspace(event);
        });
        //Register scroll
        this.ref.code.addEventListener("scroll", function (event) {
            let target = event.target;
            self.ref.preview.style.transform = `translate3d(-${target.scrollLeft}px, -${target.scrollTop}px, 0)`;
            self.ref.lines.style.transform = `translate3d(0, -${target.scrollTop}px, 0)`;
        });
        //Check for initial value
        if (typeof value === "string") {
            this.updateCode(value);
        }
    },
    //Handle tab
    "handleTab": function (event) {
        //Check for handling tabs: TODO
        if (event.keyCode !== 9) {
            return; //No tab character pressed
        }
        event.preventDefault(); //Disable tab character
        let el = this.ref.code;
        let selStart = el.selectionStart;
        let selEnd = el.selectionEnd;
        //let value = el.value;
        //Get selection value
        let beforeSelection = el.value.substr(0, selStart); //Get before selection
        let currentSelection = el.value.substring(selStart, selEnd); //Get current selection
        let afterSelection = el.value.substring(selEnd); //Get after selection
        let indent = " ".repeat(this.options.tabSize); //Array(this.options.tabSize + 1).join(" "); //Indentation 
        //Check for indenting a block
        if (selStart !== selEnd) {
            let newSelectionStart = selStart;
            let newSelectionEnd = selEnd;
            let lineStart = selStart - beforeSelection.split("\n").pop().length;
            //console.log("line start: " + lineStart);
            //Check for no shift key pressed --> apply indent
            if (event.shiftKey === false) {
                beforeSelection = beforeSelection.substr(0, lineStart) + indent + beforeSelection.substring(lineStart, selStart)
                currentSelection = currentSelection.replace(/\n/g, "\n" + indent); //Add a tab to all lines on this selection
                newSelectionStart = selStart + indent.length;
                newSelectionEnd = selStart + currentSelection.length + indent.length;
            }
            //Shift key pressed
            else {
                //Remove indentation of the first line
                let lineStartIndent = 0; //indent.length; //To store the indentation removed
                let lineStartValue = el.value.substr(lineStart, indent.length);
                //console.log("line start value: '" + lineStartValue + "'");
                //Check if the line starts with an indent
                if (lineStartValue === indent) {
                    let removeIndentStart = lineStart;
                    let removeIndentEnd = lineStart + indent.length;
                    //console.log("remove start: " + removeIndentStart);
                    //console.log("remove end: " + removeIndentEnd);
                    //Check if the line start is in the selection start
                    if (removeIndentStart === selStart) {
                        currentSelection = el.value.substring(removeIndentEnd, selEnd);
                        lineStartIndent = indent.length;
                    }
                    //Check if the remove end is not in the selection start
                    else if (removeIndentEnd <= selStart) {
                        beforeSelection = el.value.substr(0, lineStart) + el.value.substring(removeIndentEnd, selStart);
                        lineStartIndent = indent.length;
                    }
                    //Other --> mixed
                    else {
                        beforeSelection = el.value.substr(0, removeIndentStart);
                        currentSelection = el.value.substring(removeIndentEnd, selEnd);
                        lineStartIndent = Math.abs(selStart - removeIndentEnd);
                    }
                }
                //Remove indentation from current selection
                let indentRegex = "\n" + "\\ ".repeat(this.options.tabSize); 
                currentSelection = currentSelection.replace(new RegExp(indentRegex, "g"), "\n"); //Remove one indentation
                newSelectionStart = Math.max(0, selStart - lineStartIndent);
                newSelectionEnd = newSelectionStart + currentSelection.length;
            }
            //Update the code
            el.value = beforeSelection + currentSelection + afterSelection;
            el.selectionStart = newSelectionStart; 
            el.selectionEnd = newSelectionEnd;
            //console.log("new selection start: " + el.selectionStart);
            //console.log("new selection end: " + el.selectionEnd);
        }
        //Apply the default indentation at the current point
        else {
            el.value = beforeSelection + indent + afterSelection; //Add indent
            el.selectionStart = selStart + indent.length; //Update selection start
            el.selectionEnd = selStart + indent.length; //Update selection end
        }
        //Update the code value
        this.updateCode(el.value);
    },
    //Handle closing char
    "handleClosingChar": function (event) {
        //TODO: check if closing chars is enabled
        let self = this;
        let key = event.key; //Get current key
        let openChars = self.state.autoClosingPairs.open;
        let closeChars = self.state.autoClosingPairs.close;
        //Check for no opening or closing chars
        if (openChars.includes(key) === false && closeChars.includes(key) === false) {
            return; //Not a closable char
        }
        let el = this.ref.code;
        let selStart = el.selectionStart;
        let selEnd = el.selectionEnd;
        let beforeSelection = el.value.substring(0, selStart); //Get before selection
        let currentSelection = el.value.substring(selStart, selEnd); //Get current selection
        let afterSelection = el.value.substring(selEnd); //Get after selection
        let hasSelection = Math.abs(selEnd - selStart) > 0; //Save if has selection
        let newCode = null;
        //Check to skip this char
        //if (hasSelection === false && closeChars.includes(key) === true) {
        let isQuoteKey = isQuoteChar(key);
        if ((closeChars.includes(key) && !isQuoteKey) || (isQuoteKey && hasSelection === false)) {
            let nextChar = el.value.substr(selEnd, 1); //Get next character
            let newSelEnd = (nextChar === key) ? selEnd + 1 : selEnd; //Get new selection end
            let newChar = (nextChar !== key && isQuoteKey) ? key : ""; //Get new character
            //Generate the new code string
            newCode = beforeSelection + newChar + el.value.substring(newSelEnd);
        }
        //Add start and end chars
        else {
            //Add the closing character after the current selection
            let index = openChars.indexOf(key);
            newCode = beforeSelection + currentSelection + closeChars[index] + afterSelection;
        }
        this.updateCode(newCode);
        //Update the selection end
        el.selectionEnd = selStart;
    },
    //Handle new line
    "handleNewLine": function (event) {
        if (event.keyCode !== 13) {
            return; //No new line entered
        }
        event.preventDefault();
        let el = this.ref.code;
        let selStart = el.selectionStart;
        let selEnd = el.selectionEnd;
        let beforeSelection = el.value.substring(0, selStart); //Get before selection
        let afterSelection = el.value.substring(selEnd); //Get after selection
        //Get last line
        let lineStart = el.value.lastIndexOf("\n", selStart - 1);
        let lastSpace = lineStart + el.value.slice(lineStart + 1).search(/[^ ]|$/);
        let indentLength = (lastSpace > lineStart) ? (lastSpace - lineStart) : 0;
        //Build the new code adding the indentation
        let newCode = beforeSelection + "\n" + " ".repeat(indentLength) + afterSelection;
        el.value = newCode;
        el.selectionStart = selStart + indentLength + 1;
        el.selectionEnd = selStart + indentLength + 1;
        //Update the code
        this.updateCode(el.value);
    },
    //Handle backspace ---> remove indentation
    "handleBackspace": function (event) {
        if (event.keyCode !== 8) {
            return; //No backspace
        }
        let tabSize = this.options.tabSize;
        let el = this.ref.code;
        let selStart = el.selectionStart;
        let selEnd = el.selectionEnd;
        //Check for no selection or start of text
        if (Math.abs(selEnd - selStart) > 0 || selStart === 0) {
            return; //Nothing to do --> continue
        }
        let lineStart = el.value.lastIndexOf("\n", selStart - 1);
        let prevIndent = el.value.substring(lineStart + 1, selStart);
        if (prevIndent.length === 0 || hasOnlyWhitespaces(prevIndent) === false) {
            return; //Nothing to do ---> continue
        }
        //console.log("prev indentation = " + prevIndent.length);
        event.preventDefault(); //Prevent backspace
        let indentLength = 0; //New indentation size
        if (prevIndent.length > tabSize) {
            let res = prevIndent.length % tabSize;
            indentLength = prevIndent.length - ((res === 0) ? tabSize : res);
        }
        //console.log("new indentation = " + indentLength);
        let newCode = el.value.substring(0, lineStart + 1) + " ".repeat(indentLength) + el.value.substring(selStart);
        el.value = newCode;
        el.selectionStart = selStart - (prevIndent.length - indentLength);
        el.selectionEnd = selStart - (prevIndent.length - indentLength);
        //Update the code
        this.updateCode(el.value);
    },
    //Update lines
    "updateLines": function () {
        let newLines = this.state.code.split("\n").length;
        if (newLines === this.state.lines) {
            return; //No update required
        }
        clearElement(this.ref.lines); //Remove current lines
        for (let i = 1; i <= newLines; i++) {
            let lineElement = createElement("span", this.ref.lines);
            lineElement.classList.add("siimple__editor-lines-item");
            lineElement.textContent = i; //Add line number
        }
        //Update lines count
        this.state.lines = newLines;
    },
    //Update code
    "updateCode": function (newCode) {
        this.state.code = newCode; //Save new code text
        this.ref.code.value = newCode;
        //this.ref.preview.innerHTML = escapeHtml(newCode);
        this.ref.preview.innerHTML = colorize(newCode, this.state.language, this.state.theme, {});
        this.updateLines();
    },
    //Get current value
    "getValue": function () {
        return this.state.code;
    },
    //Set new value
    "setValue": function (value) {
        return this.updateCode(newValue);
    },
    //Focus to the editor
    "focus": function () {
        this.ref.textarea.focus();
    },
    //Destroy the editor
    "destroy": function () {
        //TODO
    }
};

//Create a new editor instance
let createEditor = function (parent, options) {
    return new Editor(parent, options);
};

//Export methods
export {
    defaultOptions,
    createEditor,
    Editor
};


