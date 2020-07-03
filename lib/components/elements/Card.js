import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Card base component
export const Card = function (props) {
    let newProps = filterProps(props, ["className", "theme"]);
    newProps.className = classNames(props.className, {
        "siimple-card": true,
        ["siimple-card--" + props.theme]: props.theme === "light" || props.theme === "dark"
    });
    //Return card wrapper
    return React.createElement("div", newProps, props.children);
};

Card.defaultProps = {
    "theme": ""
};

//Other card components
export const CardContent = htmlElement("div", "siimple-card-content");
export const CardImage = htmlElement("div", "siimple-card-image");
export const CardLink = htmlElement("div", "siimple-card-link");

