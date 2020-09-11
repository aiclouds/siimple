import React from "react";
import {ForEach} from "neutrine/lib/components";
import {Icon} from "neutrine/lib/components";

import style from "./style.scss";

//List icons
export function ListIcons (props) {
    return (
        <ForEach items={props.icons} render={function (icon, index) {
            let onClick = function () {
                return props.onClick(icon.id);
            };
            return (
                <div key={index} className={style.icon} onClick={onClick}>
                    <div className={style.iconPreview}>
                        <Icon icon={icon.id} size="50px" />
                    </div>
                    <div className={style.iconName}>{icon.id}</div>
                </div>
            );
        }} />
    );
} 


