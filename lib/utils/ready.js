//Register a ready listener
let registerReadyListener = function (callback) {
    //Check if the state is not loading
    if (document.readyState !== "loading") {
        return callback();
    }
    //Register the event listener
    document.addEventListener("DOMContentLoaded", function (event) {
        if (document.readyState === "loading") {
            return;
        }
        //Call the provided callback function
        return callback();
    });
};

//Export when ready listener
export function whenReady (callback) {
    if (typeof callback === "function") {
        return registerReadyListener(callback);
    }
    //Otherwise, return a promise that resolves when dom is ready
    return new Promise (function (resolve, reject) {
        return registerReadyListener(resolve);
    });
}

