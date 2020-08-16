//Database modes
export const storageModes = {
    "read": "readonly",
    "write": "readwrite"
};

//Default database options
let defaultOptions = {
    "name": "database",
    "version": 1,
    "upgrade": null
};

//Storage class
export const Storage = function (options) {
    this.options = Object.assign({}, defaultOptions, options); //Save db options
    this.connection = null; //Database connection
};

//Database prototype
Storage.prototype = {
    //Get the connection to the database
    "getDatabase": function () {
        let self = this;
        let options = self.options;
        return new Promise(function (resolve, reject) {
            if (self.connection !== null) {
                return resolve(self.connection); //Return the database connection
            }
            //Open the connection to the database
            let request = window.indexedDB.open(options.name, options.version);
            //Register on upgrade listener
            request.addEventListener("upgradeneeded", function (event) {
                //console.log("Update database");
                options.upgrade(event.target.result, event); //Call the upgrade method
            });
            //Database opened
            request.addEventListener("success", function (event) {
                //console.log("database ready");
                self.connection = event.target.result; //Save database instance
                return resolve(self.connection);
            });
            //Database connection error
            request.addEventListener("error", function (event) {
                return reject(event);
            });
        });
    },
    //Perform an action to the database
    "tx": function (names, mode, listener) {
        let self = this;
        return getDatabase().then(function (db) {
            //let transaction = db.call(null, self.db); //Get the transaction
            let transaction = db.transaction(names, mode);
            //Register transaction completed listener
            transaction.addEventListener("complete", function (event) {
                return resolve(event);
            });
            //Register transaction error listener
            transaction.addEventListener("error", function (event) {
                return reject(event);
            });
            //Perfom actions witht he transaction
            return listener(transaction, names, mode);
        });
    },
    //Get a single store element
    "store": function (name, mode, callback) {
        return this.tx(name, mode, function (transaction) {
            return callback(transaction.objectStore(name));
        });
    },
    //Insert a new item into a single store
    "add": function (name, item, key) {
        return this.store(name, storageModes.write, function (store) {
            store.add(item, key); //Insert this new item
        });
    },
    //Get a single item by key
    "get": function (name, key) {
        let value = null; //Initialize the store value
        return this.store(name, storageModes.read, function (store) {
            return store.get(key).addEventListener("success", function (event) {
                value = event.target.value; //Save the value
            });
        }).then(function () {
            return value; //Return the value in the promise
        });
    },
    //Similar to add but updating a value
    "update": function (name, key, newValue) {
        //TODO: check if key and newValue are both defined
        return this.store(name, storageModes.write, function (store) {
            store.put(newValue, key);
        });
    },
    //Delete an item from the store
    "delete": function (name, key) {
        return this.store(name, storageModes.write, function (store) {
            store.delete(key); //Delete
        });
    },
    //Iterate over all elements of an store
    "forEach": function (name, callback) {
        return this.store(name, storageModes.read, function (store) {
            let count = 0; //To store the items index
            return store.openCursor().addEventListener("success", function (event) {
                let cursor = event.target.result; //Get cursor
                if (!cursor || cursor === null) {
                    return; //No more items to process
                }
                //Call the callback with the item
                callback(cursor.key, cursor.value, count);
                count = count + 1; //Increment the counter
                return cursor.continue(); //Next item
            });
        });
    },
    //Get a list with all keys in the store
    "keys": function (name) {
        let keysList = []; //Output list of keys
        return this.forEach(name, function (key) {
            keysList.push(key); //Save this key
        }).then(function () {
            return keysList; //Return the keys list in the promise
        });
    },
    //Delete the database
    "destroy": function () {
        let self = this;
        return new Promise(function (resolve, reject) {
            let request = window.indexedDB.deleteDatabase(self.options.name);
            //Register completed request
            request.addEventListener("success", function (event) {
                return resolve(event);
            });
            //Register error request
            request.addEventListener("error", function (event) {
                return reject(event);
            });
        });
    },
    //Close the connection to the database
    "close": function () {
        if (this.connection === null) {
            return null; //Nothing to close
        }
        //Close the connection
        return this.connection.close();
    }
};

//Create a new storage
export function createStorage (options) {
    return new Storage(options);
}

