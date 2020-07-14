import React from "react";
import {createEditor, defaultOptions} from "./editor.js";
import {filterProps} from "../utils/reactProps.js";

//Code editor component
export class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        //Referenced elements
        this.ref = {
            "parent": React.createRef()
        };
        this.editor = null; //Editor reference
        //Bind methods
        this.getCode = this.getCode.bind(this);
        this.setCode = this.setCode.bind(this);
    }
    //Component did mount --> mount code editor
    componentDidMount() {
        let options = filterProps(this.props, ["defaultValue", "key", "ref"]);
        this.editor = createEditor(this.ref.parent.current, options);
        this.editor.init(this.props.defaultValue); //Initialize editor
    }
    //Component will unmount --> destroy editor
    componentWillUnmount() {
        this.editor.destroy();
        delete this.editor; //Remove the reference to the editor
    }
    //Get current code
    getCode() {
        return this.editor.getCode();
    }
    //Change current code
    setCode(newCode) {
        return this.editor.setCode(newCode);
    }
    //Render editor component
    render() {
        return React.createElement("div", {
            "ref": this.ref.parent
        });
    }
}

//Editor class default props
EditorComponent.defaultProps = {
    "defaultValue": "" //Initial value
};


