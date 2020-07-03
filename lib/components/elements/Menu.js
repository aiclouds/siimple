import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Menu component
export const Menu = htmlElement("div", "siimple-menu");
export const MenuGroup = htmlElement("div", "siimple-menu-group");
export const MenuDivider = htmlElement("div", "siimple-menu-divider");

//Menu item
export const MenuItem = function (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-menu-item": true,
        "siimple-menu-item--active": props.active
    });
    //Return the menu item element
    return React.createElement("div", newProps, props.children);
};

//Menu item default props
MenuItem.defaultProps = {
    "active": false
};

