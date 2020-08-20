import React from "react";
import {classNames} from "../../../utils/classnames.js";
import {filterProps} from "../../../utils/reactProps.js";
import "./style.scss";

//Export range component
export const Range = React.forwardRef(function (props, ref) {
    //Clone the input props
    let inputProps = filterProps(props, ["fluid", "disabled", "color", "className", "type"]);
    //Initialize the input class list
    let classList = ["siimple__range"];
    //Check the fluid property
    if (typeof props.fluid === "boolean" && props.fluid === true) {
        classList.push("siimple__range--fluid");
    }
    //Check the disabled property
    if (props.disabled === true) {
        classList.push("siimple__range--disabled");
    }
    //Update range input props
    Object.assign(inputProps, {
        "type": "range",
        "className": classNames(classList, props.className),
        "ref": ref
    });
    //Return the input element
    return React.createElement("input", inputProps);
});

//Range default props
Range.defaultProps = {
    "fluid": false,
    "disabled": false
};

