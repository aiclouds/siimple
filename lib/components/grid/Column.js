import React from "react";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Grid column class
export const Column = function (props) {
    let newProps = filterProps(props, ["className", "size", "xlarge", "large", "medium", "small", "xsmall"]);
    let classList = ["siimple-column"];
    //Check the column size
    if (typeof props.size === "number" || typeof props.size === "string") {
        classList.push("siimple-column--" + props.size);
    }
    if (typeof props.xlarge === "number" || typeof props.xlarge === "string") {
        classList.push("siimple-column--xl-" + props.xlarge);
    }
    if (typeof props.large === "number" || typeof props.large === "string") {
        classList.push("siimple-column--lg-" + props.large);
    }
    if (typeof props.medium === "number" || typeof props.medium === "string") {
        classList.push("siimple-column--md-" + props.medium);
    }
    if (typeof props.small === "number" || typeof props.small === "string") {
        classList.push("siimple-column--sm-" + props.medium);
    }
    if (typeof props.xsmall === "number" || typeof props.xsmall === "string") {
        classList.push("siimple-column--xs-" + props.xsmall);
    }
    //Join all class names
    newProps.className = classNames(classList, props.className);
    //Return the grid element
    return React.createElement("div", newProps, props.children);
};

//Column default props
Column.defaultProps = {
    "size": null, 
    "xlarge": null,
    "large": null, 
    "medium": null, 
    "small": null,
    "xsmall": null
};

