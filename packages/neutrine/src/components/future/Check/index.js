import React from "react";
import {classNames} from "../../../utils/classnames.js";
import "./style.scss";

//Export fake checkbox component
export const Check = function (props) {
    return React.createElement("div", {
        "className": classNames({
            "siimple__check": true,
            "siimple__check--active": props.active === true || props.checked === true
        }),
        "onClick": props.onClick
    });
};

//Fake check default props
Check.defaultProps = {
    "active": false, //alias for checked
    "checked": false,
    "onClick": null
};

