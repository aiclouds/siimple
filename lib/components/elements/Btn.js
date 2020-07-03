import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Button component
export const Btn = function (props) {
    //Initialize the button props 
    let newProps = filterProps(props, ["className", "color", "disabled", "fluid", "small", "large"]);
    //Initialize the class names list 
    let classList = ["siimple-btn"];
    //Add the button color
    if (typeof props.color === "string") {
        classList.push("siimple-btn--" + props.color.toLowerCase().trim());
    }
    //Add the button disabled option
    if (props.disabled === true) {
        classList.push("siimple-btn--disabled");
    }
    //Check the fluid property
    if (props.fluid === true) {
        //btn_props.style = { width: '100%', paddingLeft: '0px', paddingRight: '0px' };
        classList.push("siimple-btn--fluid");
    }
    //Check the small property
    if (props.small === true) {
        classList.push("siimple-btn--small");
    }
    //Check the large property
    if (props.large === true) {
        classList.push("siimple-btn--large");
    }
    //Append the provided class names
    newProps.className = classNames(classList, props.className);
    //Return the button element
    return React.createElement("div", newProps, (props.content !== null) ? props.content : props.children);
};

//Default properties values
Btn.defaultProps = { 
    "color": null, 
    "disabled": false, 
    "fluid": false,
    "small": false,
    "large": false,
    "content": null
};

//Button groups
export const BtnGroup = htmlElement("div", "siimple-btn-group");

