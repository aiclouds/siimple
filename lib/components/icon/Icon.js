import React from "react";
import {filterProps} from "../../utils/reactProps.js";
import {classNames} from "../../utils/classnames.js";

//Export icon component
export const Icon = function (props) {
    let newProps = filterProps(props, ["className", "icon", "iconTag", "size"]); //Filter props
    Object.assign(newProps, {
        "className": classNames(props.className, {
            "siimple-icon": true,
            ["siimple-icon-" + props.icon]: props.icon !== ""
        }),
        "style": Object.assign({
            "fontSize": props.size,
            "lineHeight": "normal"
        }, props.style)
    });
    //Return the icon
    return React.createElement(props.iconTag, newProps, props.children);
};

//Icon default props
Icon.defaultProps = {
    "icon": "",
    "className": null,
    "iconTag": "span",
    "size": null
};

