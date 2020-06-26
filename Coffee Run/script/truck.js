
// DOM window object is named as window variable.
(function(window){

    // prevent use of undeclared variables.
    "use strict";
    // global window.App is assigned to App variable, else create a new object.
    var App = window.App || {};

    // Truck is a factory class.  db is a DataStore object.
    function Truck(truckId, db){
        this.truckId = truckId;
        // a DataStore object is made to be a child of a Truck object.
        this.db = db;
    }

    // createOrder member function
    // order is a DataStore.data key
    Truck.prototype.createOrder = function(order){
        console.log("Adding order for " + order.emailAddress);
        // add(key, value) is a DataStore function
        this.db.add(order.emailAddress, order);
    };

    // deliverOrder member function
    // customerId is a DataStore.data key
    Truck.prototype.deliverOrder = function(customerId) {
        console.log("Delivering order for " + customerId);
        this.db.remove(customerId);
    };

    // printOrders member function
    Truck.prototype.printOrders = function(){
        // Object.keys(Array[key, val]) returns an array of keys.
        // this.db.getAll() is a DataStore function
        var customerIdArray = Object.keys(this.db.getAll());

        console.log("Truck #" + this.truckId + " has pending orders:");

        // this keyword not available to forEach unless using bind (p.189)
        // bind assigns Truck to this and passes this into forEach.
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    // Truck is assigned to a new variable App.Truck.
    App.Truck = Truck;
    // var App is assigned back to global window.App
    window.App = App;

    // DOM window object is passed to function.
})(window);