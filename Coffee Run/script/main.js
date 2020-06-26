(function(window){
    "use strict";
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    // selector to point to html tag with
    // { key data-coffee-order, value checklist }
    const CHECKLIST_SELECTOR = "[data-coffee-order=checklist]";

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var myTruck = new Truck("ncc-1701", new DataStore());
    window.myTruck = myTruck;
    //
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    // page 221
    formHandler.addSubmitHandler(function(data){
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });
    console.log(formHandler);
})(window);