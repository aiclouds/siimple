//Non closing tags
let nonClosingTags = ["link", "meta"];
let consoleMethods = ["log", "error", "dir", "info", "warn", "assert", "debug", "clear"];

//Alias to check if the value is an array
let isArray = function (value) {
    return typeof value === "object" && value !== null && Array.isArray(value);
};

//Create a new HTML element
let createElement = function (tag, attrs, content) {
    let parsedAttrs = Object.keys(attrs).map(function (name) {
        return `${name}="${attrs[name]}"`;
    });
    //Check if this tag is not in the non closing tags list
    if (nonClosingTags.indexOf(tag) === -1) {
        return `<${tag} ${parsedAttrs.join(" ")}>${content}</${tag}>`;
    }
    //Default --> return without closing
    return `<${tag} ${parsedAttrs.join(" ")} />`;
};

//Generate script content
let generateScript = function (js) {
    let scriptContent = js; //TODO: add try-catch wrapper to the js script
    let tagContent = `
    //console.clear();
    document.addEventListener("DOMContentLoaded", function () {
        let script = document.createElement("script");
        script.innerHTML = ${JSON.stringify(scriptContent)};
        document.body.appendChild(script);
    });`;
    //Return the js script tag
    return createElement("script", {"type": "text/javascript"}, tagContent);
};

//Generate style content
let generateStyle = function (css) {
    return createElement("style", {}, css);
};

//Generate document
let generateDocument = function (content, runtime) {
    let bodyContent = (typeof content.html === "string") ? content.html : ""; //Body content
    let headContent = ""; //Initialize head content
    //Check for meta content
    if (isArray(content.meta)) {
        headContent = headContent + content.meta.map(function (meta) {
            return createElement("meta", meta, null);
        }).join("");
    }
    //Add external styles
    if (isArray(content.externalStyles)) {
        headContent = headContent + content.externalStyles.map(function (src) {
            return createElement("link", {"rel": "stylesheet", "type": "text/css", "href": src});
        }).join("");
    }
    //Check for style content
    if (typeof content.style === "string") {
        headContent = headContent + generateStyle(content.style);
    }
    //Append scripts libs
    if (isArray(content.externalScripts)) {
        headContent = headContent + content.externalScripts.map(function (src) {
            return createElement("script", {"type": "text/javascript", "src": src}, "");
        }).join("");
    }
    //TODO: add runtime
    //Append script content (TODO: add this to body instead of to head?)
    if (typeof content.script === "string") {
        headContent = headContent + generateScript(content.script);
    }
    //Return the document content
    return `<html><head>${headContent}</head><body>${bodyContent}</body></html>`;
};

//Create a new iframe
let createIframe = function (options) {
    let newIframe = document.createElement("iframe");
    newIframe.style.border = "0"; //Remove iframe border
    //Add iframe permissions
    if (isArray(options.permissions)) {
        newIframe.setAttribute("sandbox", options.permissions.join(" "));
    }
    //Check if this iframe should be visible
    if (options.visible === true) {
        newIframe.setAttribute("scrolling", "yes"); //Enable iframe scrolling
        newIframe.style.width = options.width; //Iframe width
        newIframe.style.height = options.height; //Iframe height
        //newIframe.style.border = "0"; //Remove iframe borders 
    }
    else {
        //Invisible iframe element
        newIframe.width = 1;
        newIframe.height = 1;
        newIframe.style.opacity = 0;
        newIframe.style.position = "absolute";
        newIframe.style.top = "-100px";
    }
    //Return the iframe element
    return newIframe;
};

//Sandbox options
let defaultOptions = {
    "visible": true, //Iframe is visible or hidden
    "permissions": ["allow-forms", "allow-same-origin", "allow-scripts"],
    //"scrolling": true, //Enable iframe scrolling
    "width": "100%",
    "height": "100%"
};

//Sandbox class
let Sandbox = function (options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.parent = null;
    this.iframe = null; //Iframe reference
    this.events = {}; //Register events
    this.runtime = {}; //Sandbox runtime
};

//Sandbox methods
Sandbox.prototype = {
    //Load a new sandbox
    "load": function (content) {
        let self = this;
        if (this.iframe !== null && this.parent !== null) {
            this.parent.removeChild(this.iframe); //Remove
        }
        this.iframe = createIframe(this.options); //Create a new iframe element
        //Check for parent element --> mount the iframe
        if (this.parent !== null) {
            this.parent.appendChild(this.iframe); //Mount iframe
        }
        //Bind iframe console
        consoleMethods.forEach(function (method) {
            self.iframe.contentWindow.console[method] = function () {
                let args = arguments; //Get console arguments
                //window.console[method].apply(window.console, args); //Call parent console
                return self.fireEventListener(`console:${method}`, args);
            };
        });
        //Build html content
        let htmlContent = generateDocument(content, this.runtime);
        //Load iframe content
        this.iframe.contentWindow.document.open();
        this.iframe.contentWindow.document.write(htmlContent);
        this.iframe.contentWindow.document.close();
    },
    //Run a JS command in the sandbox
    "run": function (command) {
        if (this.iframe === null) {
            //TODO: throw an error --> the iframe is not ready
            return null;
        }
        //Initialize the response object
        let response = {
            "error": false,
            "command": command,
        };
        try {
            //Run this command in the iframe element
            response.value = this.iframe.contentWindow.eval(command);
            //this.iframe.contentWindow.$_ = response.value;
        } catch (error) {
            response.error = true;
            response.value = error;
        }
        //Return the response object
        return response;
    },
    //Mount the sandbox --> append the iframe to the provided parent
    "mount": function (parent) {
        this.parent = parent; //Save the reference to the parent
        if (this.iframe !== null) {
            this.parent.appendChild(this.iframe); //Mount iframe
        }
    },
    //Unmount the sandbox --> remove the iframe from the old parent
    "unmount": function () {
        if (this.parent === null || this.iframe === null) {
            this.parent = null; //Remove the iframe instance
            return; //Nothing to do
        }
        //Unmount the iframe from the parent element
        this.parent.removeChild(this.iframe);
        this.parent = null; //Clear parent reference
    },
    //Destroy the sandbox
    "destroy": function () {
        if (this.parent !== null) {
            this.unmount(); //Unmount the iframe
        }
        //this.parent = null; //Remove parent reference
        this.iframe = null; //Remove iframe reference
    },
    //Register an event listener
    "addEventListener": function (name, listener) {
        this.events[name] = listener;
    },
    //Remove and event listener
    "removeEventListener": function (name) {
        delete this.events[name];
    },
    //Fire an event
    "fireEventListener": function (name, args) {
        if (typeof this.events[name] === "function") {
            return this.events[name].apply(null, args);
        }
        //Default --> this event is not registered, continue
        return null;
    }
};

//Create a new sandbox instance
let createSandbox = function (options) {
    return new Sandbox(options);
};

//Export sandbox methods
export {
    Sandbox,
    createSandbox,
    defaultOptions
};

