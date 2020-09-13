import React from "react";
import {htmlElement} from "../../utils/reactElements.js";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Radio component 
export const Radio = React.forwardRef(function (props, ref) {
    let inputProps = filterProps(props, ["className"]); //Filter props
    //Return the radio element
    return React.createElement("input", Object.assign(inputProps, {
        "className": classNames("siimple-radio", props.className),
        "type": "radio",
        "ref": ref
    }));
});

//Fake radio
export function FakeRadio (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-radio": true,
        "siimple-radio--active": props.active
    });
    //Return the fake radio element
    return React.createElement("div", newProps);
}

//Fake radio props
FakeRadio.defaultprops = {
    "active": false
};

