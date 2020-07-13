import {classNames} from "./classnames.js";

//Filter props list
export function filterProps (props, ignoreProps) {
    //Check for no props object
    if (typeof props !== "object" || props === null) {
        return {};
    }
    //Check the ignore props array
    if (typeof ignoreProps !== "object" || Array.isArray(ignoreProps) === false) {
        ignoreProps = [];
    }
    let newProps = {};
    //Initialize the ignored keys of the props with the children prop
    let keys = {
        "children": true
    };
    ignoreProps.forEach(function (key) {
        keys[key] = true;
    });
    //Filter the props object
    Object.keys(props).forEach(function (key) {
        if (!keys[key]) {
            newProps[key] = props[key];
        }
    });
    //Return the new props object
    return newProps;
}

//Merge props and replace 
export function mergeProps (props, extraProps) {
    Object.keys(props).forEach(function (key) {
        //Check for className prop key
        if (key === "className") {
            extraProps.className = classNames(extraProps.className, props.className);
        }
        //Check if this prop does not exists in the original props object
        else if (key !== "children" && typeof extraProps[key] === "undefined") {
            extraProps[key] = props[key];
        }
    });
    //Return the extra props
    return extraProps;
}

//Call a prop to get a value
export function callProp (prop, args) {
    if (typeof prop === "function") {
        return prop.apply(null, args);
    }
    //Return the prop value
    return prop;
}


