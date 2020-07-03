import React from "react";
import {uniqueId} from "../../common/uniqueId.js";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Checkbox component 
export const Checkbox = React.forwardRef(function (props, ref) {
    //Input default props
    let inputProps =filterProps(props, ["className", "style", "id", "ref"]);
    inputProps.type = "checkbox";
    inputProps.id = (typeof props.id === "string") ? props.id : uniqueId();
    //Save the checkbox reference
    inputProps.ref = ref; 
    //Checkbox children content
    let inputChild = React.createElement("input", inputProps, null);
    let labelChild = React.createElement("label", {"htmlFor": inputProps.id}, null);
    //Build the checkbox props
    let checkboxProps = {
        "className": classNames("siimple-checkbox", props.className),
        "style": props.style
    };
    //Return the checkbox element
    return React.createElement("div", checkboxProps, inputChild, labelChild);  
});

