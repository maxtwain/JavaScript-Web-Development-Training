(function(window){
    "use strict";
    var App = window.App || {};
    // $ will be later used to reference jQuery functions like $(arg).
    var $ = window.jQuery;

    // This selector variable is later used as a search criteria used to find
    // DOM elements. The intended use will be the html <form>
    function FormHandler(selector){
        // JS aberration. Throw error if function is used without an argument.
        if(!selector){
            throw new Error("No selector provided");
        }

        // $formElement is a variable created as a child of FormHandler.
        // $(criteria) finds all DOM elements which match the criteria.
        // if criteria would be "p", then all <p> elements would be returned.
        // The intended use here is to pass the <form> to jQuery.  jQuery
        // returns a nodeList containing
        // [coffeeOrder, emailInput, radio, flavorShot, strengthLevel].
        // This nodeList is assigned to $formElement.
        this.$formElement = $(selector);
        // if the $formElement nodeList contains no elements
        if(this.$formElement.length === 0){
            throw new Error("Could not find element with selector: " + selector);
        }

        // member function intended to listen for submit button
        // fn is intended to be a function to which the processed form data
        // can be sent.
        FormHandler.prototype.addSubmitHandler = function(fn){
            console.log("Setting submit handler for form");

            // $formElement is a <form>.  On form submit event do this...
            this.$formElement.on("submit", function(event){
                // prevent default submit event
                event.preventDefault();

                // new data object
                var data = {};
                // More JS BS.  this is no longer FormHandler. In an event,
                // this refers to the element that received the event.  Here,
                // this refers to this.$formElement.  Outside of the event, it
                // will again be FormHandler.
                // serializeArray() converts the nodeList of form elements
                // into an array.  Each array element is processed...
                $(this).serializeArray().forEach(function(item) {
                    // Normally such serialized array elements would look like
                    // element[key, value], but these elements are serialized
                    // form objects and thus look like this:
                    // Object[name, value].
                    // Previously declared data variable will hold an array of
                    // item[name, value] where item is a form element.
                    data[item.name] = item.value;
                    console.log(item.name + " is " + item.value);
                });

                console.log(data);
                // processed form data is sent to fn method.
                // The intention is for a Truck createOrder method, but it
                // could be anything.
                fn(data);
                // clears input from the form.
                this.reset();
                // focus first form element.
                this.elements[0].focus();
            });
        };
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);