/*
// This code:
function name(){ code; }
name();

// can be written like this instead:
(function(){ code; })();

// With parameters it looks like this:
(function(parameter){ code; })(parameter);

*/

// The window object passed in from the bottom of the function is given
// the variable name window.
(function(window) {
    // prevent the use of undeclared variables and other strict rules.
    "use strict";
    /*
    var App = {};  // new object
    if (window.App) App = window.App;  // if window.App exists
    */
    // The existing window.App is grabbed from the window object for modification.
    // Later, the modified App variable will overwrite the existing window.App.
    var App = window.App || {};

    // The way DataStore is used, it is essentially a factory class with
    // member variables and functions.
    function DataStore() {
        // this refers to DataStore.
        // The variable data is created as a child of DataStore();
        // DataStore.data is created as an empty object.
        this.data = {};
    }

    // DataStore member function add is created as add(key, val)
    DataStore.prototype.add = function(key, val){
        // this.data refers to the previously created DataStore.data
        // data is made to hold an array. The first element is val at key index.
        this.data[key] = val;
    };

    // returns DataStore.data[key]
    DataStore.prototype.get = function(key){
        return this.data[key];
    };

    // returns DataStore.data array
    DataStore.prototype.getAll = function(){
        return this.data;
    };

    // deletes DataStore.data[key]
    DataStore.prototype.remove = function(key){
        delete this.data[key];
    };

    // create DataStore variable as child of App object.
    // assign DataStore() definition to DataStore variable.
    // DataStore() can then be called with App.DataStore()
    App.DataStore = DataStore;
    // create App variable as child of window and assign to it the App object.
    window.App = App;

// The global window object is passed into the function.
}) (window);