import React from "react";
import {classNames} from "../../../utils/classnames.js";
import {htmlElement} from "../../../utils/reactElements.js";
import "./style.scss";

//Export panel basic components
export const Panel = htmlElement("div", "siimple__panel");
export const PanelHeader = htmlElement("div", "siimple__panel-header");
export const PanelTitle = htmlElement("div", "siimple__panel-title");
export const PanelBody = htmlElement("div", "siimple__panel-body");
export const PanelFooter = htmlElement("div", "siimple__panel-footer");

//Export tab wrapper
export function PanelTab (props) {
    let tabProps = {
        "className": classNames(props.className, {
            "siimple__panel-tab": true,
            "siimple__panel-tab--active": props.active === true
        }),
        "onClick": props.onClick,
        "style": props.style
    };
    //Build tab element
    return React.createElement("div", tabProps, props.text);
}


