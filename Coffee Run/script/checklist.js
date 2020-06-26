
// A new variable named window is assigned the window object
(function (window) {
    // prevents the use of some silly things JS allows
    "use strict";
    // A new variable named App is assigned the value of window.App.  If
    // window.App does not exist, App is created as an empty object.
    // The intention is for this to be a temporary exchange while App is modified.
    var App = window.App || {};
    // The new variable $ is assigned the value of jQuery, which has previously
    // been attached to the window object in an html script
    var $ = window.jQuery;

    // CheckList module.  selector is intended to hold jQuery criteria
    function CheckList(selector){
        // if no variable was passed
        if(!selector){
            throw new Error("No selector provided");
        }

        // CheckList.$element = user form data
        this.$element = $(selector);
        // if user form data contains no elements
        if(this.$element.length === 0){
            throw new Error("Could not find element with selector: " + selector);
        }
    }

    CheckList.prototype.addClickHandler = function (fn){
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    // addRow method.  coffeeOrder holds the user form data.
    CheckList.prototype.addRow = function (coffeeOrder) {
        // Remove any existing rows that match the email address
        // CheckList.removeRow
        this.removeRow(coffeeOrder.emailAddress);

        // Create a new instance of a row, using the coffee order info
        // rowElement = Row html tag structure
        // JS BS.  rowElement gains $element child from Row().
        var rowElement = new Row(coffeeOrder);

        // Add the new row instance's $element property to the checklist
        // It doesn't make sense to me why CheckList.$element had been used
        // to hold form data, but now it is used to add html tags as well.
        this.$element.append(rowElement.$element);
    };

    // called with CheckList.removeRow(coffeeOrder.emailAddress)
    CheckList.prototype.removeRow = function (email) {
        // CheckList.$element is user form data.
        this.$element
            //
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    // Row constructor.  coffeeOrder holds the user form data.
    function Row(coffeeOrder){
        // when jQuery is passed with such parameters, it produces an html tag
        // with the designated attributes.
        // jQuery("opentag></closetag>", { key: value, key: value })
        // key names with dashes or JS keywords need to be Strings.
        var $div = $("<div></div>", {
            "data-coffee-order": "checkbox",
            "class": "checkbox"
        });

        var $label = $("<label></label>");

        // The book actually says it is <input></input>, but this is wrong.
        var $checkbox = $("<input>", {
            type: "checkbox",
            value: coffeeOrder.emailAddress
        });
        // concatenated String user order info.
        var description = coffeeOrder.size + " ";
        if(coffeeOrder.flavor){
            description += coffeeOrder.flavor + " ";
        }

        description += coffeeOrder.coffee + ", ";
        description += " (" + coffeeOrder.emailAddress + ") ";
        description += " [" + coffeeOrder.strength + "x]";

        // append inserts the arg between the variable tags after last element.
        // <label> <input/> </label>
        $label.append($checkbox);
        // <label> <input/> description </label>
        $label.append(description);
        // <div> <label> <input/> description </label> </div>
        $div.append($label);

        // Row.$element = html tag structure
        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;

    // window object is a function parameter
})(window);