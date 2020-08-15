import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Export tag component 
export const Tag = function (props) {
    let newProps = filterProps(props, ["className", "color", "rounded"]);
    let classList = ["siimple-tag"];
    //Check the color attribute
    if (typeof props.color === "string") {
        classList.push("siimple-tag--" + props.color.toLowerCase().trim());
    }
    //Check the rounded attribute
    if (typeof props.rounded === "boolean" && props.rounded === true) {
        classList.push("siimple-tag--rounded");
    }
    //Generate the tag classname
    newProps.className = classNames(classList, props.className);
    //Return the tag element
    return React.createElement("div", newProps, props.children);
};

//Tag default props
Tag.defaultProps = {
    "color": null,
    "rounded": false
};

//Grouped tag
export const TagGroup = htmlElement("span", "siimple-tag-group");

