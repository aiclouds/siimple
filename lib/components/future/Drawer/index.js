import React from "react";
import {htmlElement} from "../../../utils/reactElements.js";
import {classNames} from "../../../utils/classnames.js";
import {filterProps} from "../../../utils/reactProps.js";
import "./style.scss";

//Available positions
let sidePositions = ["left", "right", "top", "bottom"];

//Export side component
export const Side = function (props) {
    let sideProps = {
        "className": classNames(props.className, {
            "siimple__drawer": true,
            "siimple__drawer--visible": props.visible === true,
            "siimple__drawer--rounded": props.rounded === true
        }),
        "style": props.style
    };
    //Return the side wrapper
    return React.createElement("div", sideProps, props.children);
};

//Side default props
Side.defaultProps = {
    "rounded": false,
    "visible": true
};

//Side background
export const SideBackground = htmlElement("div", "siimple__drawer-background");

//Side content
export const SideContent = function (props) {
    //Build the content props
    let contentProps = {
        "className": classNames(props.className, {
            "siimple__drawer-content": true,
            ["siimple__drawer-content--" + props.position]: sidePositions.indexOf(props.position) !== -1
        }),
        "style": Object.assign({}, props.style, {
            "width": "100%",
            "height": "100%"
        })
    };
    //Check the content position
    if (props.position === "right" || props.position === "left") {
        contentProps.style.width = props.size;
    }
    else {
        contentProps.style.height = props.size;
    }
    //Return the side container
    return React.createElement("div", contentProps, props.children);
};

//Side content default props
SideContent.defaultProps = {
    "position": "right",
    "size": "400px",
    "style": null
};

