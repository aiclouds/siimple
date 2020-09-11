import React from "react";
import kofi from "kofi";
import {If, ForEach} from "neutrine/lib/components";
import {Code, Heading, Paragraph, Pre} from "neutrine/lib/components";
import {Icon} from "neutrine/lib/components";
import {Input} from "neutrine/lib/components";
import {Btn, Rule, Spinner} from "neutrine/lib/components";
import {Row, Column} from "neutrine/lib/components";
import {Placeholder} from "neutrine/lib/components";

import {PreviewIcon} from "./Preview.js";
import {ListIcons} from "./List.js";

import "neutrine/lib/components.css";
import style from "./style.scss";

//Icons explorer component
export class IconsExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "loading": true,
            "icons": [],
            "categories": [],
            "filter": "",
            //"iconsMatched": 0,
            //"iconsFiltered": [],
            //"iconsLimit": this.props.iconsIncrement,
            "iconSelected": ""
        };
        //Global variables
        this.filterTimer = null;
        //Bind methods
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handlePreviewClose = this.handlePreviewClose.bind(this);
    }
    //Component did mount --> import icons data
    componentDidMount() {
        let self = this;
        let newState = {"loading": false}; //Data object
        return kofi.delay(2000).then(function () {
            return kofi.request({"url": "/assets/icons-list.json", "json": true});
        }).then(function (response) {
            //Save icons list
            newState["icons"] = response.body.map(function (icon) {
                return icon; //TODO
            });
            newState["iconsMatched"] = response.body.length; //Count the number of matched icons
            return kofi.request({"url": "/assets/icons-categories.json", "json": true});
        }).then(function (response) {
            newState["categories"] = response.body; //Save categories list
            return self.setState(newState);
        });
    }
    //Change filters
    handleFilterChange(event) {
        let self = this;
        if (this.state.loading === true) {
            return null; //Loading icons
        }
        clearTimeout(this.filterTimer); //Clear timer
        let value = event.target.value.toLowerCase().trim(); //Get filter value
        //console.log(`value: '${event.target.value}'`);
        //wait 500 seconds before applying the filter
        this.filterTimer = setTimeout(function () {
            //let iconsMatched = self.filterIcons(value, self.state.icons.length + 10).length; //Get matched icons
            return self.setState({
                //"iconsLimit": self.props.iconsIncrement, //Reset displayed icons
                //"iconsMatched": iconsMatched,
                "filter": value
            });
        }, 500);
    }
    //Load more icons
    //handleMoreClick() {
    //    return this.setState({
    //        "iconsLimit": this.state.iconsLimit + this.props.iconsIncrement
    //    });
    //}
    //handle icon click --> show the modal with the icon info
    handleIconClick(name) {
        return this.setState({"iconSelected": name});
    }
    //Handle close click --> hide modal
    handlePreviewClose() {
        return this.setState({"iconSelected": ""});
    }
    //Filter icons
    filterIcons(filter, limit) {
        //let filter = this.state.filter.trim().toLowerCase();
        //let count = 0; //Count number of displayed icons
        return this.state.icons.filter(function (icon, index) {
            //if (count >= limit) {
            //    return false; //No more icons are allowed
            //}
            //Check if the filter matches the icon id
            if (filter === "" || icon.id.indexOf(filter) !== -1) {
                //count = count + 1; //Increment the number if displayed icons
                return true;
            }
            //Check if the filter matches the keywords of the icon
            //for (let i = 0; i < icon.keywords.length; i++) {
            //    if (icon.keywords[i].indexOf(filter) !== -1) {
            //        return true;
            //    }
            //}
            //Icon not matched
            return false;
        });
    }
    //Render loading panel
    renderLoading() {
        return (
            <div align="center" className="siimple--py-9">
                <Spinner color="primary" />
            </div>
        );
    }
    //Render icons explorer
    render() {
        let self = this;
        if (this.state.loading === true) {
            return this.renderLoading(); //Render loading
        }
        //Get icons to display
        //let limit = this.state.iconsLimit;
        //let matched = this.state.iconsMatched;
        let isFiltered = this.state.filter.length > 0;
        let isLoading = this.state.loading;
        //Filter the icons list
        let iconsList = this.filterIcons(this.state.filter);
        //console.log(`displaying ${iconsList.length} icons`);
        //Render components
        //let gallery = this.renderIcons(iconsFiltered, isFiltered);
        //Return the icons gallery
        return (
            <React.Fragment>
                <div className="siimple--mb-0">
                    <Input type="text" fluid onChange={this.handleFilterChange} placeholder="Search icons" />
                </div>
                <Rule className="" />
                <ListIcons icons={iconsList} onClick={this.handleIconClick} />
                {/* No icons available */}
                <If condition={iconsList.length === 0}>
                    <Placeholder border="dashed" active={false} hover={false}>
                        <div className="siimple--py-5">
                            <Heading type="h5" className="siimple--mb-1">
                                <span>No matches found</span>
                            </Heading>
                            <div style={{"opacity":"0.8"}}>
                                Sorry, we could not find any icon that matches your search.
                            </div>
                        </div>
                    </Placeholder>
                </If>
                {/* Modal with the icon preview */}
                <If condition={this.state.iconSelected !== ""} render={function () {
                    return React.createElement(PreviewIcon, {
                        "icon": self.state.iconSelected,
                        "onClose": self.handlePreviewClose
                    });
                }} />
            </React.Fragment>
        );
    }
} 


