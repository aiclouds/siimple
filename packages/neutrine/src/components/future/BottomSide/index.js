import React from "react";
import {classNames} from "../../../utils/classnames.js";
import "./style.scss";

//Export bottom side component
export class BottomSide extends React.Component {
    constructor(props) {
        super(props);
        //Initial state
        this.state = {
            "collapsed": false
        };
        //Bind methods
        this.handleCollapse = this.handleCollapse.bind(this);
    }
    //Handle side collapse
    handleCollapse() {
        return this.setState({
            "collapsed": !this.state.collapsed
        });
    }
    //Render the title
    renderHeaderTitle() {
        return this.props.title;
    }
    //Render the header chevron
    renderHeaderChevron() {
        return React.createElement("div", {
            "className": "siimple__bottomside-chevron"
        });
    }
    //Render the bottom side header
    renderHeader() {
        //Build the header props
        let props = {
            "className": "siimple__bottomsidde-header",
            "onClick": this.handleCollapse
        };
        //Return the header
        return React.createElement("div", props, this.renderHeaderTitle(), this.renderHeaderChevron());
    }
    //Render the body component
    renderBody() {
        //Build the body props
        let props = {
            "className": "siimple__bottomside-body",
            "style": {
                "height": this.props.height
            }
        };
        //Return the body component
        return React.createElement("div", props, this.props.children);
    }
    //Render the bottom side component
    render() {
        //Build the component props
        let props = {
            "className": classNames({
                "siimple__bottomside": true,
                "siimple__bottomside--collapsed": this.state.collapsed
            }),
            "style": {
                "bottom": (this.state.collapsed) ? "-" + this.props.height : null
            }
        };
        //Return the bottom side component
        return React.createElement("div", props, this.renderHeader(), this.renderBody());
    }
}

//Bottom side component default props
BottomSide.defaultProps = {
    "title": "",
    "height": "350px"
};

