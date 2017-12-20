/*jshint esversion: 6 */

/*
This controller is for the home view.
-  users can select a method for finding a senator
- senator information is displayed
- form captures user input
- users send input to database and to mail route to be sent to senator
*/

myApp.controller('HomeController', function ($http, vcRecaptchaService, $mdToast) {
    console.log('in HomeController');
    const vm = this;

    //reCaptcha key
    vm.publicKey = '6LdcUz0UAAAAAKDt_Tc7bGGELcPJu10P4IEaP9t_';
    vm.testKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    // object to hold senators information
    vm.senators = {};

    // email to send to if google API doesn't pull an email for senator 
    const defaultEmail = 'hunter@rancourt.pro';

    // message object to post
    vm.message = {
    }; // end message

    

    // boolean for showing dropDown buttons
    vm.dropDownButton = true;

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
        // clear out message object
        vm.message = {};
        // reset Captcha
        vcRecaptchaService.reload(vm.widgetId);
        // hide reset button until form is used again
        vm.reset = false;
    }; // end startOver

    // list of states to display in drop down menu
    vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY')
        .split(' ').map((state) => {
            return { abbrev: state };
        } // end map
    ); // end states

    // toast icon appears after message sent
    vm.showToast = () => {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Message Sent!')
                .position('bottom right')
                .hideDelay(4000)
        ); // end mdtoast
    }; // end showToast

    // Get the widgetId when the recaptcha instance is created via onCreate callback
    vm.onWidgetCreate = function (_widgetId) {
        vm.widgetId = _widgetId;
    }; // end onWidgetCreate


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
        // if string is empty
        if (vcRecaptchaService.getResponse() === "") { 
            // convert to mddialog
            alert("Please resolve the captcha and submit!");
        } else {
            vm.message['g-recaptcha-response'] = vcRecaptchaService.getResponse();
        } // end else

        // if google API doesn't have senator's email use defaultEmail
        vm.message.senatorEmail = vm.message.senatorEmail ? vm.senatorCard.senator.emails[0] : defaultEmail;
        return $http.post('/mail', vm.message)
        .then((response) => {
            //show Toast
            vm.showToast();
            // reset page
            vm.startOver();
        }); // end return
    }; // end sendMessage


    /************** on page load **************/

    // get senator data from google
    vm.getSenators();

}); // end HomeController