import React from "react";
import {Icon} from "../../icon/Icon.js";
import {htmlElement, mergeElement} from "../../../utils/reactElements.js";
import {classNames} from "../../../utils/classnames.js";
import {filterProps} from "../../../utils/reactProps.js";

import "./style.scss";

//Group basic elements
export const Group = htmlElement("div", "siimple__group");
export const GroupTitle = htmlElement("div", "siimple__group-title");
export const GroupDescription = htmlElement("div", "siimple__group-description");
export const GroupText = htmlElement("div", "siimple__group-text");
export const GroupAction = htmlElement("div", "siimple__group-action");

//Main group container
export const GroupRow = function (props) {
    let newProps = filterProps(props, ["dashed", "border", "hover", "className"]);
    //Add the element class
    newProps.className = classNames(props.className, {
        "siimple__group-row": true,
        "siimple__group-row--border": props.border === true,
        "siimple__group-row--hover": props.hover === true,
        "siimple__group-row--dashed": props.dashed === true
    });
    //Return the row component
    return React.createElement("div", newProps, props.children);
};

//Row default props
GroupRow.defaultProps = {
    "hover": true,
    "dashed": false,
    "border": false
};

//Group item component
export const GroupColumn = function (props) {
    //Extract item component props
    let newProps = filterProps(props, ["visibleOnlyOnHover", "className", "primary", "secondary"]);
    //Build group classlist
    newProps.className = classNames(props.className, {
        "siimple__group-column": true,
        "siimple__group-column--visible-only-on-hover": props.visibleOnlyOnHover === true,
        "siimple__group-column--primary": props.primary === true,
        "siimple__group-column--secondary": props.secondary === true
    });
    //Return the new component
    return React.createElement("div", newProps, props.children);
};

//Column default props
GroupColumn.defaultProps = {
    "visibleOnlyOnHover": false,
    "primary": false,
    "secondary": false
};

//Group icon
export const GroupIcon = function (props) {
    return mergeElement(Icon, props, {
        "style": {
            "lineHeight": "40px"
        },
        "className": classNames({
            "siimple__group-icon": true,
            ["siimple--bg-" + props.color]: props.color !== "",
            ["siimple__group-icon--circle"]: props.appearance === "circle",
            ["siimple__group-icon--square"]: props.appearance === "square"
        })
    });
};

//Group icon color
GroupIcon.defaultProps = {
    "appearance": "circle",
    "color": "primary"
};

//Group label
export const GroupLabel = function (props) {
    let labelProps = {
        "className": classNames(props.className, {
            "siimple__group-label": true,
            ["siimple__group-label--" + props.color]: true
        })
    };
    //Return the label element
    return React.createElement("span", labelProps, props.text);
};

//Label props
GroupLabel.defaultProps = {
    "color": "primary",
    "text": ""
};

//Group add icon
export const GroupAdd = function (props) {
    return mergeElement(Icon, props, {
        "className": "siimple__group-add",
        "icon": "plus"
    });
};

