import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Breadcrumb parent component
export const Breadcrumb = htmlElement("div", "siimple-breadcrumb");

//Breadcrumb item component
export const BreadcrumbItem = function (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-breadcrumb-item": true,
        "siimple-breadcrumb-item--active": props.active === true
    });
    //Return the breadcrumb item
    return React.createElement("div", newProps, props.children);
};

BreadcrumbItem.defaultProps = {
    "active": false
};

