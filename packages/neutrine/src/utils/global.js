//Global storage
let GlobalStorage = function () {
    this.storage = {}; //Storage object
};

//Global storage prototype
GlobalStorage.prototype = {
    "get": function (key) {
        return (typeof this.storage[key] !== "undefined") ? this.storage[key] : null;
    },
    "set": function (key, value) {
        this.storage[key] = value;
    }
};

//Create a new global storage instance
export function createGlobalStorage () {
    return new GlobalStorage();
}

//Export global storage
export const global = createGlobalStorage();

