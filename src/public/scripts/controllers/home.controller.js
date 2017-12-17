/*jshint esversion: 6 */

/*
This controller is for the home view.
-  
*/

myApp.controller('HomeController', function ($http) {
    console.log('in HomeController');
    const vm = this;



    /************** $http **************/

    // test get
    vm.testAPI = () => {
        return $http.get('/senators').then((response) => {
            console.log('response.data', response);
        }); // end return
    }; // end testAPI


    /************** on page load **************/

    // see what data is returned
    vm.testAPI();

}); // end HomeController