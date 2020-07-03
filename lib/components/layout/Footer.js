import React from "react";
import {htmlElement} from "../../reactElements.js";
import {filterProps} from "../../reactProps.js";
import {classNames} from "../../classnames.js";

//Footer layout component
export const Footer = function (props) {
    let newProps = filterProps(props, ["className", "size"]); //Filter props
    //Initialize the footer class list
    let classList = ["siimple-footer"];
    //Check the content size
    if (typeof props.size === "string") {
        classList.push("siimple-footer--" + props.size.toLowerCase());
    }
    //Generate the footer classname
    newProps.className = classNames(classList, props.className);
    //Render the footer div
    return React.createElement("div", newProps, props.children);
};

//Default props
Footer.defaultProps = {
    "size": null 
};

//Other footer components
export const FooterTitle = htmlElement("div", "siimple-footer-title");
export const FooterSubtitle = htmlElement("div", "siimple-footer-subtitle");
export const FooterLink = htmlElement("div", "siimple-footer-link");

