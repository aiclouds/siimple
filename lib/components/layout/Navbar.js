import React from "react";
import {htmlElement, mergeElement} from "../../reactElements.js";
import {filterProps} from "../../reactProps.js";
import {classNames} from "../../classnames.js";

//Navbar default class
export const Navbar = function (props) {
    //Clone the navbar props 
    let newProps = helpers.filterProps(props, ["className", "color", "size", "fixedTop", "fixedBottom"]);
    //Generate navbar class-list
    let classList = ["siimple-navbar"];
    //Add navbar color
    if (typeof props.color === "string" && props.color !== "") {
        classList.push("siimple-navbar--" + props.color);
    }
    //Add navbar size
    if (typeof props.size === "string" && props.size !== "") {
        classList.push("siimple-navbar--" + props.size);
    }
    //Check if navbar is fixed top
    if (props.fixedTop === true) {
        classList.push("siimple-navbar--fixed-top");
    }
    //Check if navbar is fixed bottom
    if (props.fixedBottom === true) {
        classList.push("siimple-navbar--fixed-bottom");
    }
    //Generate classnames
    newProps.className = classNames(props.classNames, classList);
    //Render the navbar
    return React.createElement("div", newProps, props.children);
};

Navbar.defaultProps = {
    "color": "", 
    "size": "fluid",
    "fixedTop": false,
    "fixedBottom": false
};

//Navbar brand element
export const NavbarBrand = htmlElement("div", "siimple-navbar-brand");
export const NavbarItem = htmlElement("div", "siimple-navbar-item");
export const NavbarLink = htmlElement("div", "siimple-navbar-link");
export const NavbarMenu = htmlElement("div", "siimple-navbar-menu");

//Navbar toggle component
export const NavbarToggle = function (props) {
    return mergeElement("div", props, {
        "className": "siimple-navbar-toggle",
        "tabIndex": "0"
    });
};

