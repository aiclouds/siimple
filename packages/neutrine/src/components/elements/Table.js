import React from "react";
import {classNames} from "../../utils/classnames.js";
import {htmlElement} from "../../utils/reactElements.js";
import {filterProps} from "../../utils/reactProps.js";

//Export main table component
export const Table = function (props) {
    let newProps = filterProps(props, ["className", "striped", "border", "hover"]);
    newProps.className = classNames(props.className, {
        "siimple-table": true,
        "siimple-table--striped": props.striped === true,
        "siimple-table--border": props.border === true,
        "siimple-table--hover": props.hover === true,
        "siimple-table--divider": props.divider === true
    });
    //Return the table wrapper element
    return React.createElement("div", newProps, props.children);
};

//Table default properties
Table.defaultProps = {
    "striped": false, 
    "border": false, 
    "hover": false,
    "divider": true
};

//Export table header component
export const TableHeader = htmlElement("div", "siimple-table-header");
export const TableBody = htmlElement("div", "siimple-table-body");
export const TableRow = htmlElement("div", "siimple-table-row");

//Export table cell component
export const TableCell = function (props) {
    let newProps = filterProps(props, ["className", "sortable", "order"]);
    let classList = ["siimple-table-cell"];
    //Check the sortable option
    if (typeof props.sortable === "boolean" && props.sortable === true) {
        classList.push("siimple-table-cell--sortable");
    }
    //Check the sort order
    if (typeof props.order === "string") {
        classList.push("siimple-table-cell--" + props.order);
    }
    //Merge classlist
    newProps.className = classNames(classList, props.className);
    //Return the table cell
    return React.createElement("div", newProps, props.children);
};

//Table cell default props
TableCell.defaultProps = {
    "sortable": false,
    "order": null
};

