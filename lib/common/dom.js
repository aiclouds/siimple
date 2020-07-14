//Create an element node
export function createElement (name, parent) {
    let element = document.createElement(name);
    if (typeof parent !== "undefined" && parent !== null) {
        parent.appendChild(element);
    }
    return element;
}

//Mount an element
export function mountElement (node, parent) {
    parent.appendChild(node);
}

//Remove all children of a dom node
export function clearElement (node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

//Remove an element
export function removeElement (node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

//Style an element
export function styleElement (node, style) {
    return Object.keys(style).forEach(function (key) {
        node.style[key] = style[key];
    });
}

//Find a class-name in a node list
export const findClassInNodeList = function (list, className, callback) {
    for(let i = 0; i < list.length; i++) {
        //Check if this node contains the provided class name
        if (list[i].classList.contains(className) === true) {
            return callback.call(null, list[i], i);
        }
    }
    //Item not found
    return null;
};


