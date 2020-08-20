import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Heading wrapper
export const Heading = function (props) {
    let newProps = filterProps(props, ["type", "className"]); //Filter props
    //Initialize the header class list
    let classList = [];
    //Check the header type
    if (typeof props.type === "string" && props.type.charAt(0).toLowerCase() === "h" && props.type.length === 2) {
        classList.push("siimple-" + props.type.toLowerCase().trim());
    }
    //Generate the header classname
    newProps.className = classNames(classList, props.className);
    //Return the heading element
    return React.createElement("div", newProps, props.children);
};

//Default heading props
Heading.defaultProps = {
    "type": "h1"
};

//Export typography components 
export const Blockquote = htmlElement("div", "siimple-blockquote");
export const Code = htmlElement("code", "siimple-code");
export const Heading1 = htmlElement("div", "siimple-h1");
export const Heading2 = htmlElement("div", "siimple-h2");
export const Heading3 = htmlElement("div", "siimple-h3");
export const Heading4 = htmlElement("div", "siimple-h4");
export const Heading5 = htmlElement("div", "siimple-h5");
export const Heading6 = htmlElement("div", "siimple-h6");
export const Link = htmlElement("a", "siimple-link");
export const Paragraph = htmlElement("div", "siimple-paragraph");
export const Lead = htmlElement("div", "siimple-lead");
export const Pre = htmlElement("pre", "siimple-pre");
export const Small = htmlElement("span", "siimple-small");

