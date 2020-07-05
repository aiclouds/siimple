import React from "react";
import {Btn} from "../elements/Btn.js";
import {Modal, ModalContent} from "../experiments/Modal.js";
import {ModalHeader, ModalHeaderTitle, ModalHeaderClose, ModalBody, ModalFooter} from "../experiments/Modal.js";

//Build confirmation header
let ConfirmHeader = function (props) {
    return React.createElement(ModalHeader, {}, 
        React.createElement(ModalHeaderTitle, {}, props.title),
        React.createElement(ModalHeaderClose, {"onClick": props.onClose})
    );
};

//Build confirmation body
let ConfirmBody = function (props) {
    return React.createElement(ModalBody, {}, (props.content !== null) ? props.content : props.children);
};

//Build the conform footer
let ConfirmFooter = function (props) {
    let cancelButton = React.createElement(Btn, {
        "content": props.cancelText,
        "className": props.cancelClassName,
        "color": props.cancelColor,
        "style": props.cancelStyle,
        "onClick": props.onCancel
    });
    let confirmButton = React.createElement(Btn, {
        "content": props.confirmText,
        "color": props.confirmColor,
        "className": helpers.classNames("siimple--ml-1", props.confirmClassName),
        "style": props.confirmStyle,
        "onClick": props.onConfirm
    });
    //Build the footer props
    let footerProps = {
        "align": "right",
        "className": "siimple--pt-0 siimple--bg-white"
    };
    return React.createElement(ModalFooter, footerProps, cancelButton, confirmButton);
};

//Export confirm component
export function Confirm (props) {
    if (props.visible === false) {
        return null; //Nothing to render
    }
    //Return the confirm wrapper
    return React.createElement(Modal, {"size": props.size}, 
        React.createElement(ModalContent, {}, 
            ConfirmHeader(props), 
            ConfirmBody(props), 
            ConfirmFooter(props)
        )
    );
}

Confirm.defaultProps = {
    "size": "small",
    "visible": true,
    "onCancel": null,
    "onConfirm": null,
    "cancelText": "Cancel",
    "cancelColor": null,
    "cancelStyle": null,
    "cancelClassName": "siimple--text-bold",
    "confirmText": "Ok",
    "confirmColor": "success",
    "confirmStyle": null,
    "confirmClassName": "siimple--text-bold",
    "title": "Are you sure?",
    "content": null
};

//Confirmer component
export class Confirmer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "active": false
        };
        this.show = this.show.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    //Show the confirmation dialog
    show(props) {
        return this.setState(Object.assign(props, {
            "active": true
        }));
    }
    //Handle cancel --> hide the confirmation dialog and call the onCancel method
    handleCancel() {
        let props = this.state;
        return this.setState({"active": false}, function () {
            if (typeof props.onCancel === "function") {
                return props.onCancel();
            }
        });
    }
    //Handle confirm --> hide the confirmation dialog and call the onConfirm method
    handleConfirm() {
        let props = this.state;
        return this.setState({"active": false}, function () {
            if (typeof props.onConfirm === "function") {
                return props.onConfirm();
            }
        });
    }
    //Render the confirmation modal
    render() {
        if (this.state.active === false) {
            return null; //Confirmation not visible
        }
        //Render the confirm component
        return React.createElement(Confirm, Object.assign({}, this.state, {
            "visible": true,
            "onCancel": this.handleCancel,
            "onConfirm": this.handleConfirm
        }));
    }
}

