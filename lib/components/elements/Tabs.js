import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Export tabs component
export const Tabs = htmlElement("div", "siimple-tabs");

//Tabs item component 
export const TabsItem = function (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-tabs-item": true,
        "siimple-tabs-item--active": props.active
    });
    //Return the tab item
    return React.createElement("div", newProps, props.children);
};

//Tabs item default props 
TabsItem.defaultProps = {
    "active": false
};

