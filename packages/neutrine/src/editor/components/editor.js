import React from "react";
import {createEditor, defaultOptions} from "../editor.js";
import {filterProps} from "../../utils/reactProps.js";

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
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
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
    //Get current editor value
    getValue() {
        return this.editor.getValue();
    }
    //Change current editor value
    setValue(value) {
        return this.editor.setValue(value);
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

