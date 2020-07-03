import React from "react";
import {uniqueId} from "../../common/uniqueId.js";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Switch component
export const Switch = React.forwardRef(function (props, ref) {
    let inputProps = filterProps(props, ["style", "id", "className", "ref"]);
    inputProps.type = "checkbox";
    inputProps.id = (typeof props.id === "string") ? props.id : uniqueId();
    inputProps.ref = ref;
    //Switch children content
    let inputChild = React.createElement("input", inputProps, null);
    let labelChild = React.createElement("label", {"htmlFor": inputProps.id}, null);
    //Generate the switch props
    let switchProps = {
        "className": classNames("siimple-switch", props.className),
        "style": props.style
    };
    //Return the switch element
    return React.createElement("div", switchProps, inputChild, labelChild);
});

