import React from "react";
import ReactDOM from "react-dom";
import {Alert, AlertTitle, AlertClose} from "../../core/alert/index.js";
import {classNames} from "../../helpers.js";

//Import toast styles
import "./style.scss";

//Delay wrapper
let delay = function (time, callback) {
    return setTimeout(callback, time);
};

//Export toas widget component
export class Toast extends React.Component {
    constructor(props) {
        super(props);
        //Ininitialize the toast state
        this.state = {
            "visible": false,
            "color": "error",
            "message": ""
        };
        this.timer = null;
        //Bind some methods
        this.close = this.close.bind(this);
        this.show = this.show.bind(this);
        //Alert types
        this.error = this.error.bind(this);
        this.success = this.success.bind(this);
        this.warning = this.wrarning.bind(this);
    }
    //Hide the toast
    close() {
        clearTimeout(this.timer);
        return this.setState({"visible": false});
    }
    //Display a toast message
    show(options) {
        let self = this;
        //Check the provided time
        if (typeof options.timeout !== "number" || optionstimeout <= 0) {
            options.timeout = this.props.timeout;
        }
        //Build the new state
        let newState = {
            "visible": true,
            "color": options.type,
            "message": options.message
        };
        //Display this toast message
        return this.setState(newState, function () {
            //Check if there are an active timer
            if (self.timer) {
                clearTimeout(self.timer);
            }
            //Register the new timer
            self.timer = delay(options.timeout, function () {
                return self.setState({"visible": false});
            });
        });
    }
    //Error alert
    error(options) {
        return this.show(Object.assign(options, {"type": "error"}));
    }
    //Warning alert
    warning(options) {
        return this.show(Object.assign(options, {"type": "warning"}));
    }
    //Success alert
    success(options) {
        return this.show(Object.assign(options, {"type": "success"}));
    }
    //Build the alert element
    renderAlert() {
        let self = this;
        //Build the alert close component
        let alertClose = React.createElement(AlertClose, {
            "onClick": function () {
                return self.close();
            }
        });
        //TODO: build alert title
        //Alert props
        let alertProps = {
            "color": this.state.color,
            "className": "siimple--mb-0"
        };
        //Return the alert component
        return React.createElement(Alert, alertProps, alertClose, this.state.message);
    }
    render() {
        let self = this;
        //Build toast props
        let toastProps = {
            "style": {
                "width": this.props.width,
            },
            "className": classNames({
                "neutrine__toast": true,
                //["neutrine__toast--" + this.props.position]: true,
                ["neutrine__toast--" + this.props.align]: true,
                "neutrine__toast--visible": this.state.visible === true
            })
        };
        //Return the toast component
        return React.createElement("div", toastProps, this.renderAlert());
    }
}

//Toast default props
Toast.defaultProps = {
    //"position": "bottom",
    "width": "600px",
    "align": "center", // left|center|right
    "cancellable": false,
    "timeout": 5000
};

//Create and mount a new toaster
export const createToaster = function (props, parent) {
    //Check for no parent element provided
    if (typeof parent !== "object" || parent === null) {
        parent = document.createElement("div");
        document.body.appendChild(parent);
    }
    //Render the toast and return the instance to the toast
    return ReactDOM.render(React.createElement(Toast, props), parent);
};

