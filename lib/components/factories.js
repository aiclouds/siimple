import React from "react";
import ReactDOM from "react-dom";

import {Confirmer} from "./widgets/Confirm/index.js";
import {Loader} from "./widgets/Loading/index.js";
import {Toast} from "./widgets/Toast/index.js";

//Factory method
let factoryComponent = function (component) {
    return function (props, parent) {
        //Check for no parent element provided
        if (typeof parent !== "object" || parent === null) {
            parent = document.createElement("div");
            document.body.appendChild(parent);
        }
        //Mount the component
        return ReactDOM.render(React.createElement(component, props), parent);
    };
};

//Export confirmers
export const createConfirmer = factoryComponent(Confirmer);
export const createLoader = factoryComponent(Loader);
export const createToaster = factoryComponent(Toast);

