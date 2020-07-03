import React from "react";
import {htmlElement} from "../../reactElements.js";
import {filterProps} from "../../reactProps.js";
import {classNames} from "../../classnames.js";

//Jumbotron base component
export const Jumbotron = function (props) {
    let newProps = filterProps(props, ["className", "color", "size"]);
    //Initialize the jumbotron class names list
    let classList = ["siimple-jumbotron"];
    //Check the jumbotron color
    if (typeof props.color === "string") {
        classList.push("siimple-jumbotron--" + props.color.toLowerCase());
    }
    //Check the jumbotron size property
    if (typeof props.size === "string") {
        classList.push("siimple-jumbotron--" + props.size.toLowerCase());
    }
    //Generate the jumbotron classname
    newProps.className = classNames(classList, props.className);
    //Return the parent div
    return React.createElement("div", newProps, props.children);
};

//Jumbotron default props
Jumbotron.defaultProps = {
    "color": null, 
    "size": null
};

//Other jumbotron components
export const JumbotronTitle = htmlElement("div", "siimple-jumbotron-title");
export const JumbotronSubtitle = htmlElement("div", "siimple-jumbotron-subtitle");

