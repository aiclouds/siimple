import React from "react";
import {htmlElement} from "../../utils/reactElements.js";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Switch component 
export const Switch = React.forwardRef(function (props, ref) {
    let inputProps = filterProps(props, ["className"]); //Filter props
    //Return the switch element
    return React.createElement("input", Object.assign(inputProps, {
        "className": classNames("siimple-switch", props.className),
        "type": "checkbox",
        "ref": ref
    }));
});

//Fake switch
export function FakeSwitch (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-switch": true,
        "siimple-switch--active": props.active
    });
    //Return the fake switch element
    return React.createElement("div", newProps);
}

//Fake switch props
FakeSwitch.defaultprops = {
    "active": false
};

