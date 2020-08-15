import React from "react";
import {htmlElement} from "../../../utils/reactElements.js";
import {classNames} from "../../../utils/classnames.js";
import {filterProps} from "../../../utils/reactProps.js";
import {Icon} from "../../icon/Icon.js";
import "./style.scss";

//Export item style
export const Item = htmlElement("div", "siimple__item");
export const ItemContent = htmlElement("div", "siimple__item-content");
export const ItemBefore = htmlElement("div", "siimple__item-before");
export const ItemAfter = htmlElement("div", "siimple__item-after");

//Export item icon wrapper
export function ItemIcon (props) {
    let newProps = filterProps(props, ["className", "appearance"]);
    //Assign icon props
    Object.assign(newProps, {
        "className": classNames(props.className, {
            "siimple__item-icon": true,
            "siimple__item-icon--square": props.appearance === "square",
            "siimple__item-icon--circle": props.appearance === "circle"
        }),
        "iconTag": "div" //Display icon in a <div> instead of in a <span>
    });
    //Return the icon wrapper
    return React.createElement(Icon, newProps);
}

ItemIcon.defaultProps = {
    "appearance": "square"
};

