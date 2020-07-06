import React from "react";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";
import {classNames} from "../../utils/classnames.js";

//Export main modal component
export const Modal = function (props) {
    let newProps = filterProps(props, ["className", "width"]); //Filter props
    //Initialize the modal class
    let classList = ["siimple-modal"];
    //Check for modal predefined size
    if (typeof props.size === "string") {
        classList.push("siimple-modal--" + props.size.toLowerCase());
    }
    //Merge the modal class names
    newProps.className = classNames(classList, props.className);
    //Return the modal wrapper element
    return React.createElement("div", newProps, modalContent(props));
};

//Modal default props
Modal.defaultProps = {
    "size": null
};

//Other Modal componens
export const ModalContent = htmlElement("div", "siimple-modal-content");
export const ModalHeader = htmlElement("div", "siimple-modal-header");
export const ModalHeaderTitle = htmlElement("div", "siimple-modal-header-title");
export const ModalHeaderClose = htmlElement("div", "siimple-modal-header-close");
export const ModalBody = htmlElement("div", "siimple-modal-body");
export const ModalFooter = htmlElement("div", "siimple-modal-footer");

//Modal wrapper
export const ModalWrapper = function (props) {
    return React.createElement(Modal, {"size": props.size}, 
        React.createElement(ModalContent, {}, 
            React.createElement(ModalHeader, {}, 
                React.createElement(ModalHeaderTitle, {}, props.title),
                React.createElement(ModalHeaderClose, {"onClick": props.onClose})
            ),
            props.children
        )
    );
};


