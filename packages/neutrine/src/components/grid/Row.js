import React from "react";
import {htmlElement} from "../../utils/reactElements.js";

//Grid class
//DEPRECATED --> not used anymore
export const Grid = function (props) {
    console.log("@siimple/neutrine: Grid component has been removed");
    return React.createElement(React.Fragment, {}, props.children);
};

//Grid row
export const Row = htmlElement("div", "siimple-row");


