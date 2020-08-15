import React from "react";
import {htmlElement} from "../../../utils/reactElements.js";
import {classNames} from "../../../utils/classnames.js";
import {Icon} from "../../icon/Icon.js";
import "./style.scss";

//Export appbar wrapper component
export const Appbar = htmlElement("div", "siimple__appbar");
export const AppbarWrapper = htmlElement("div", "siimple__appbar-wrapper");
export const AppbarDivider = htmlElement("div", "siimple__appbar-divider");

//Appbar item
export const AppbarItem = function (props) {
    return React.createElement(Icon, {
        "className": classNames(props.className, {
            "siimple__appbar-item": true,
            "siimple__appbar-item--active": props.active === true
        }),
        "tag": "div",
        "onClick": props.onClick,
        "icon": props.icon,
        "style": props.style
    });
};

//Appbar item default props
AppbarItem.defaultProps = {
    "className": "",
    "icon": null,
    "active": false,
    "onClick": null,
};

export const AppbarBrand = function (props) {
    return React.createElement("div", {
        "className": classNames("siimple__appbar-brand", props.className),
        "style": Object.assign({}, props.style, {
            "backgroundImage": (props.image !== null) ? "url(" + props.image + ")" : null
        }),
        "onClick": props.onClick
    });
};

AppbarBrand.defaultProps = {
    "image": null,
    "style": {}
};

export const AppbarAvatar = function (props) {
    return React.createElement("div", {
        "className": classNames("siimple__appbar-avatar", props.className),
        "style": Object.assign({}, props.style, {
            "backgroundImage": (props.image !== null) ? "url(" + props.image + ")" : null
        }),
        "onClick": props.onClick
    });
};

AppbarAvatar.defaultProps = {
    "image": null,
    "style": {}
};



