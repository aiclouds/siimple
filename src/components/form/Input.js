import React from "react";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Input component
export const Input = React.forwardRef(function (props, ref) {
    let inputProps = filterProps(props, ["fluid", "className", "ref"]); //Filter props
    inputProps.className = classNames(props.className, {
        "siimple-input": true,
        "siimple-input--fluid": props.fluid === true
    });
    //Save the input reference
    inputProps.ref = ref;
    //Return the input element
    return React.createElement("input", inputProps);
});

//Input default props
Input.defaultProps = {
    "fluid": false
};

