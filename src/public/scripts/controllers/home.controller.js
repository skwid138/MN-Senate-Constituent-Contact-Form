/*jshint esversion: 6 */

/*
This controller is for the home view.
-  
*/

myApp.controller('HomeController', function ($http) {
    console.log('in HomeController');
    const vm = this;

    // object to hold senators information
    vm.senators = {};

    // boolean for showing dropDown buttons
    vm.dropDownButton = true;

    // click event for showing search drop down
    vm.showDropDown = (buttonId) => {
        if (buttonId == 0) {
            vm.showSearchName = true;
        } else if (buttonId == 1) {
            vm.showSearchDistrict = true;
        } // end else if
        // hide buttons
        vm.dropDownButton = false;
        // show reset/start over button
        vm.reset = true;
    }; // end showDropDown

    // reset form and start from the beginning
    vm.startOver = () => {
        vm.dropDownButton = true;
        vm.showSearchName = false;
        vm.showSearchDistrict = false;
        vm.reset = false;
    }; // end startOver


    /************** $http **************/

    // get senators information from Google's Civic API
    vm.getSenators = () => {
        return $http.get('/senators').then((response) => {
            console.log('response.data', response.data);
            vm.senators.list = response.data;
        }); // end return
    }; // end testAPI


    /************** on page load **************/

    // see what data is returned
    vm.getSenators();

}); // end HomeController