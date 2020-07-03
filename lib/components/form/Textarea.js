import React from "react";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Textarea component 
export const Textarea = React.forwardRef(function (props, ref) {
    let textareaProps = filterProps(props, ["fluid", "className", "ref"]); //Filter props
    //Generate the textare className
    textareaProps.className = classNames(props.className, {
        "siimple-textarea": true,
        "siimple-textarea--fluid": props.fluid === true
    });
    //Save the textarea reference
    textareaProps.ref = ref;
    //Return the textarea element
    return React.createElement("textarea", textareaProps, props.children);
});

//Textarea default props
Textarea.defaultProps = {
    "fluid": false
};

