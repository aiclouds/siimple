import React from "react";
import {htmlElement} from "../../../utils/reactElements.js";
import {classNames} from "../../../utils/classnames.js";
import {Icon} from "../../icon/Icon.js";
import "./style.scss";

//Export toolbar wrapper component
export const ToolbarWrapper = function (props) {
    let wrapperProps = {
        "className": classNames(props.className, {
            "siimple__toolbar-wrapper": true,
            "siimple__toolbar-wrapper--collapsed": props.collapsed
        }),
        "style": props.style
    }
    //Return the toolbar element
    return React.createElement("div", wrapperProps, props.children);
};

//Toolbar wrapper default props
ToolbarWrapper.defaultProps = {
    "collapsed": true
};

//Export toolbar component
export const Toolbar = function (props) {
    let toolbarProps = {
        "className": classNames(props.className, {
            "siimple__toolbar": true,
            ["siimple__toolbar--" + props.theme]: props.theme === "light" || props.theme === "dark"
        }),
        "style": props.style
    };
    //Return the toolbar component
    return React.createElement("div", toolbarProps, props.children);
};

//Toolbar default props
Toolbar.defaultProps = {
    "theme": "light"
};

//Toolbar toggle
//export const ToolbarToggle = function (props) {
//    let toggleProps = {
//        "align": "center",
//        "onClick": props.onClick,
//        "className": baseClass + "-toggle"
//    };
//    //Build the toggle icon
//    let toggleIcon = React.createElement(Icon, {
//        "icon": "chevron-left",
//        "className": baseClass + "-toggle-icon"
//    });
//    //Build the toggle element
//    return React.createElement("div", toggleProps, toggleIcon);
//};

//Toolbar item
export const ToolbarItem = function (props) {
    //Initialize the button props
    let itemProps = {
        "className": className(props.className, {
            "siimple__toolbar-item": true,
            "siimple__toolbar-item--active": props.active === true
        }),
        "onClick": props.onClick,
        "style": props.style
    };
    //Add the button icon
    let icon = null;
    if (props.icon !== null) {
        icon = React.createElement(Icon, {
            "icon": props["icon"],
            "className": "siimple__toolbar-item-icon"
        });
    }
    //Add the item text
    let text = React.createElement("span", {
        "className": "siimple__toolbar-item-text"
    }, props.text);
    //Return the toolbar item element
    return React.createElement("div", itemProps, icon, text);
};

//Toolbar item default props
ToolbarItem.defaultProps = {
    "text": "",
    "icon": null,
    "active": false,
    "onClick": null,
};

//Toolbar separator
export const ToolbarSeparator = htmlElement("div", "siimple__toolbar-separator");

//Toolbar group
export const ToolbarGroup = function (props) {
    let groupProps = {
        "className": classNames(props.className, "siimple__toolbar-group"),
        "style": props.style,
        "onClick": props.onClick
    };
    //Return the toolbar group element
    return React.createElement("div", groupProps, props.text);
};

//Toolbar group default props
ToolbarGroup.defaultProps = {
    "text": null
};

//Export toolbar brand component
export const ToolbarBrand = function (props) {
    //Build the brand props
    let brandProps = {
        "className": classNames("siimple__toolbar-brand", props.className),
        "style": Object.assign({}, props.style, {
            "backgroundImage": (props.image !== null) ? "url(" + props.image + ")" : null
        }),
        "onClick": props.onClick
    };
    //Return the toolbar brand component wrapper
    return React.createElement("div", brandProps, props.children);
};

//Toolbar brand default props
ToolbarBrand.defaultProps = {
    "image": null,
    "style": {}
};

