import React from "react";
import {htmlElement} from "../../utils/reactElements.js";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Checkbox component 
export const Checkbox = React.forwardRef(function (props, ref) {
    let inputProps = filterProps(props, ["className"]); //Filter props
    //Return the checkbox element
    return React.createElement("input", Object.assign(inputProps, {
        "className": classNames("siimple-checkbox", props.className),
        "type": "checkbox",
        "ref": ref
    }));
});

//Fake checkbox
export function FakeCheckbox (props) {
    let newProps = filterProps(props, ["active", "className"]);
    newProps.className = classNames(props.className, {
        "siimple-checkbox": true,
        "siimple-checkbox--active": props.active
    });
    //Return the fake checkbox element
    return React.createElement("div", newProps);
}

//Fake checkbox props
FakeCheckbox.defaultprops = {
    "active": false
};

