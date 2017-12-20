/*jshint esversion: 6 */

/*
This controller is for the home view.
-  
*/

myApp.controller('HomeController', function ($http, vcRecaptchaService) {
    console.log('in HomeController');
    const vm = this;

    //reCaptcha key
    vm.publicKey = '6LdcUz0UAAAAAKDt_Tc7bGGELcPJu10P4IEaP9t_';
    vm.testKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    // object to hold senators information
    vm.senators = {};

    // boolean for showing dropDown buttons
    vm.dropDownButton = true;
    // 
    const defaultEmail = 'hunter@rancourt.pro';

    // message object to post
    vm.message = {
        // include captcha thing
    }; // end message
    // set message variable
    vm.message.senatorEmail = vm.message.senatorEmail ? vm.senatorCard.senator.emails[0] : defaultEmail;

    // convert JSON to JS
    vm.convertSenator = (senator) => {
        return vm.senatorCard = JSON.parse(senator);
    }; // end convertSenator

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
        // show buttons to choose how to find senator info
        vm.dropDownButton = true;
        // reset both drop down menus
        delete vm.showSearchName;
        delete vm.showSearchDistrict;
        // if a senator was chosen reset it
        delete vm.senatorToContact;
        delete vm.senatorCard;
        // hide reset button until form is used again
        vm.reset = false;
    }; // end startOver


    /************** $http **************/

    // get senators information from Google's Civic API
    vm.getSenators = () => {
        return $http.get('/senators')
            .then((response) => {
            console.log('response.data', response.data);
            vm.senators.list = response.data;
        }); // end return
    }; // end getSenators

    // send message and store data points in Database
    vm.sendMessage = () => {
        // if google API doesn't have senator's email use below email
        // if (!vm.senatorCard.senator.emails[0]){
        //     vm.message.senatorEmail = 'hunter@rancourt.pro';
        // } else {
        //     vm.message.senatorEmail = vm.senatorCard.senator.emails[0];
        // }

       

        return $http.post('/mail', vm.message)
        .then((response) => {
            // maybe use toast or mddialog to show message sent
            vm.startOver();
        }); // end return
    }; // end sendMessage


    /************** on page load **************/

    // see what data is returned
    vm.getSenators();

}); // end HomeController