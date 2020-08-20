import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Alert component
export const Alert = function (props) {
    //Clone the alert props 
    let newProps = filterProps(props, ["className", "color"]);
    //Initialize the class list
    let classList = ["siimple-alert"];
    //Check the alert color property
    if (typeof props.color === "string") {
        classList.push("siimple-alert--" + props.color.toLowerCase().trim());
    }
    //Append the provided class list 
    newProps.className = classNames(classList, props.className);
    return React.createElement("div", newProps, props.children);
};
//Alert default props
Alert.defaultProps = { 
    "color": "primary" 
};

//Alert title component 
export const AlertTitle = htmlElement("div", "siimple-alert-title");
export const AlertClose = htmlElement("div", "siimple-alert-close");

