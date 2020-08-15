import React from "react";
import {classNames} from "./classnames.js";
import {mergeProps, filterProps} from "./reactProps.js";

//Create an htmlElement
export function htmlElement (elementTag, elementClass) {
    return function (props) {
        let newProps = Object.assign({}, filterProps(props, ["className"]), {
            "className": classNames(props.className, elementClass)
        });
        //Return the element
        return React.createElement(elementTag, newProps, props.children);
    };
}

//Create a new element mergin two props object
export function createMergedElement (tag, originalProps, newProps) {
    return React.createElement(tag, mergeProps(originalProps, newProps), originalProps.children);
}

//Alias for createMergedElement
export function mergeElement (tag, sourceProps, targetProps) {
    return React.createElement(tag, mergeProps(sourceProps, targetProps), sourceProps.children);
}

