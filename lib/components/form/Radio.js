import React from "react";
import {uniqueId} from "../../common/uniqueId.js";
import {classNames} from "../../utils/classnames.js";
import {filterProps} from "../../utils/reactProps.js";

//Radio component 
export const Radio = React.forwardRef(function (props, ref) {
    //Switch input default props
    let inputProps = filterProps(props, ["className", "style", "id", "ref"]);
    inputProps.type = "radio";
    inputProps.id = (typeof props.id === "string") ? props.id : uniqueId();
    //Save the radio reference
    inputProps.ref = ref;
    //Switch children content
    let inputChild = React.createElement("input", inputProps, null);
    let labelChild = React.createElement("label", {"htmlFor": inputProps.id}, null);
    //Radio props
    let radioProps = {
        "className": classNames("siimple-radio", props.className),
        "style": props.style
    };
    //Return the radio element
    return React.createElement("div", radioProps, props.children);
});

