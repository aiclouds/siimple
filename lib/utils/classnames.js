//Join class names
export function classNames () {
    //Initialize the list of class names
    let list = [];
    //Parse all arguments 
    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        //Check for undefined or null argument 
        if (typeof arg !== "undefined" && arg !== null) {
            //Check for string class name 
            if (typeof arg === "string") {
                list.push(arg); 
            }
            //Check for array argument
            if (Array.isArray(arg) === true && arg.length) {
                list.push(classNames.apply(null, arg));
            }
            //Check for object
            else if (typeof arg === "object") {
                //Add only classnames with a truly value
                Object.keys(arg).forEach(function (key) {
                    if (arg[key] === true) {
                        list.push(key);
                    }
                });
            }
        }
    }
    //Return the joined class names
    return list.join(" ");
}

