import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Nav wrapper
export const Nav = function (props) {
    let newProps = filterProps(props, ["vertical", "tabs", "pills", "align", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-nav": true,
        "siimple-nav--vertical": props.vertical,
        "siimple-nav--pills": props.pills,
        "siimple-nav--tabs": props.tabs,
        "siimple-nav--center": props.align === "center",
        "siimple-nav--right": props.align === "right"
    });
    //Return the nav element
    return React.createElement("div", newProps, props.children);
};

//Nav default props
Nav.defaultProps = {
    "tabs": false,
    "pills": false,
    "vertical": false,
    "align": "left"
};

//Nav item
export const NavItem = function (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-nav-item": true,
        "siimple-nav-item--active": props.active
    });
    //Return the nav item element
    return React.createElement("div", newProps, props.children);
};

//Nav item default props
NavItem.defaultProps = {
    "active": false
};

//Nav components
export const NavGroup = htmlElement("div", "siimple-nav-group");
export const NavDivider = htmlElement("div", "siimple-nav-divider");


