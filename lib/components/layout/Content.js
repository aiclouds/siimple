import React from "react";
import {filterProps} from "../../utils/reactProps.js";
import {classNames} from "../../utils/classnames.js";

//Content layout component
export const Content = function (props) {
    let newProps = filterProps(props, ["className", "size"]); //Filter props
    //Initialize the content class list
    let classList = ["siimple-content"];
    //Check the content size
    if (typeof props.size === "string") {
        classList.push("siimple-content--" + props.size.toLowerCase());
    }
    //Generate the content className
    newProps.className = classNames(classList, props.className);
    //Render the content div
    return React.createElement("div", newProps, props.children);
};

//Default props
Content.defaultProps = {
    "size": null 
};

