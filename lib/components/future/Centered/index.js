import React from "react";
import {classNames} from "../../../utils/classnames.js";
import {filterProps} from "../../../utils/reactProps.js";
import "./style.scss";

//Export centered component
export function Centered (props) {
    let newProps = filterProps(props, ["className", "direction"]);
    //Assign classname props
    newProps.className = classNames(props.className, {
        "siimple__centered": true,
        "siimple__centered--row": props.direction === "row",
        "siimple__centered--column": props.direction === "column"
    });
    //Return the centered component
    return React.createElement("div", newProps, props.children);
}

//Centered component default props
Centered.defaultProps = {
    "direction": "column"
};

